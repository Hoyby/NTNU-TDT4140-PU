from .models import Dinner, User, Attends, Rating
from .serializers import DinnerSerializer, UserSerializer, AttendsSerializer, RatingSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework import permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.db.models import Lookup


def is_valid_queryparam(param):
    return param != '' and param is not None

class DinnerIsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.host == request.user or request.user.is_superuser


class DinnerViewSet(viewsets.ModelViewSet):
    serializer_class = DinnerSerializer
    authentication_classes = (TokenAuthentication,)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['list', 'retrieve', 'create']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [DinnerIsOwnerOrAdmin]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        return serializer.save(host=self.request.user)

    def get_queryset(self):
        """
        This view should return all dinners attended and hosted by the currently
        authenticated user.
        """

        queryset = Dinner.objects.all()

        isMeat = self.request.query_params.getlist('meat')
        isFish = self.request.query_params.getlist('fish')
        isVegan = self.request.query_params.getlist('vegan')

        gluten_free = self.request.query_params.getlist('gluten')
        lactose_free = self.request.query_params.getlist('milk')
        nut_free = self.request.query_params.getlist('nuts')
        egg_free = self.request.query_params.getlist('eggs')

        if isMeat and isFish and isVegan:
            # pass if dinners have to be meat, fish or vegan
            meatDinners = queryset.filter(isMeat=True)
            fishDinners = queryset.filter(isFish=True)
            veganDinners = queryset.filter(isVegan=True)
            queryset = meatDinners | fishDinners | veganDinners

        elif isMeat and isFish:
            meatDinners = queryset.filter(isMeat=True)
            fishDinners = queryset.filter(isFish=True)
            queryset = meatDinners | fishDinners

        elif isMeat and isVegan:
            meatDinners = queryset.filter(isMeat=True)
            veganDinners = queryset.filter(isVegan=True)
            queryset = meatDinners | veganDinners

        elif isFish and isVegan:
            fishDinners = queryset.filter(isFish=True)
            veganDinners = queryset.filter(isVegan=True)
            queryset = fishDinners | veganDinners

        elif isMeat:
            queryset = queryset.filter(isMeat=True)

        elif isFish:
            queryset = queryset.filter(isFish=True)

        elif isVegan:
            queryset = queryset.filter(isVegan=True)

        if gluten_free:
            queryset = queryset.exclude(containsGluten=True)

        if lactose_free:
            queryset = queryset.exclude(containsMilk=True)

        if nut_free:
            queryset = queryset.exclude(containsNuts=True)

        if egg_free:
            queryset = queryset.exclude(containsEgg=True)
        
        if self.request.query_params.get('myDinners', None) == "True":
            hostingDinners = queryset.filter(host=self.request.user)
            attendingDinners = queryset.filter(id__in=Attends.objects.filter(
                guest=self.request.user).values('dinner'))
            queryset = (hostingDinners | attendingDinners) & queryset

        # How filtering was done earlier:
        # if categorys:
        #     dinnerCategoryQs = DinnerCategory.objects.filter(
        #         category__in=categorys)
        #     queryset = queryset.filter(
        #         id__in=dinnerCategoryQs.values('dinner'))

        # if allergens:
        #     containsQs = Contains.objects.filter(allergen__in=allergens)
        #     queryset = queryset.exclude(id__in=containsQs.values('dinner'))

        return queryset



class UserIsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(
            request.user and ((request.user.is_authenticated and obj.id == request.user.id) or request.user.is_superuser)
        )


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['create', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [UserIsOwnerOrAdmin]


        return [permission() for permission in permission_classes]



class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'id': token.user_id, 'token': token.key})

class AttendsViewSet(viewsets.ModelViewSet):
    queryset = Attends.objects.all()
    serializer_class = AttendsSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        return serializer.save(guest=self.request.user, dinner=Dinner.objects.get(id=self.request.data["id"]))

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    
    def perform_create(self, serializer):
        return serializer.save(rater=self.request.user, rated=User.objects.get(id=self.request.data["id"]), value=self.request.data["value"], feedback=self.request.data["feedback"])

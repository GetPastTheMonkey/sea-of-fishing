from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from pirate.models import Pirate
from pirate.serializers import PirateSerializer, PirateRegistrationSerializer


def pirate_response(pirate: Pirate) -> Response:
    serializer = PirateSerializer(pirate)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([AllowAny])
def register_pirate(request):
    register_serializer = PirateRegistrationSerializer(data=request.data)
    register_serializer.is_valid(raise_exception=True)
    pirate = register_serializer.save()
    return pirate_response(pirate)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_pirate_by_name(request, name):
    try:
        pirate = Pirate.objects.get(slug=name)
    except Pirate.DoesNotExist:
        raise NotFound(f"Pirate {name} does not exist")

    return pirate_response(pirate)

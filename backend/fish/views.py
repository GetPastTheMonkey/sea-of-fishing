from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from fish.models import Fish
from fish.serializers import FishSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def get_fishes_list(request):
    fishes = Fish.objects.order_by("sot_index")
    serializer = FishSerializer(fishes, many=True)
    return Response(serializer.data)

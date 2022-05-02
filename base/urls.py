from django.urls import path 
from . import views 

urlpatterns = [
  path('', views.index, name="index"),
  path('results/', views.results, name='results'),
  path('book/<str:isbn>', views.individual, name="individual"),
  path('review/<str:isbn>', views.review, name='review'),
  path('dashboard/', views.dashboard, name='user_dashboard'),
]
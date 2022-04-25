from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class Review(models.Model):
  PUBLIC = 'Public'
  PRIVACY_CHOICES = [
    ('Public', 'Public'), 
    ('Friends only', 'Friends only'), 
    ('Anonymous', 'Anonymous'),
  ]


  user = models.ForeignKey(User, on_delete=models.CASCADE)
  isbn = models.CharField(max_length=13)
  rating = models.DecimalField(
    max_digits = 2, 
    decimal_places=1,
    validators=[MaxValueValidator(5,"Rating system stops at 5!")]
  )

  date = models.DateField(auto_now=True)
  spoilers = models.BooleanField(default=False)
  privacy = models.CharField(
    max_length=50, 
    choices=PRIVACY_CHOICES, 
    default= PUBLIC,
  )
  review = models.TextField()

  class Meta:
    constraints = [
      models.CheckConstraint(check=models.Q(rating__gte=1) & models.Q(rating__lte=5),
      name="A rating is valid between 1 and 5")
    ]

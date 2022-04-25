from django import forms
from django.forms import ModelForm 
from .models import Review 

# Create a review 
class ReviewForm(ModelForm):
  class Meta:
    model = Review 
    fields = ('rating', 'review')
    exclude = ('user', 'isbn')

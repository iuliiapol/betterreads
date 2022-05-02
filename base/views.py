from django.shortcuts import render, redirect
import json
from urllib.request import urlopen
from urllib.parse import quote
from .forms import ReviewForm
from .models import Review
from django.contrib import messages

# Create your views here.
def index(request):
  return render(request, 'index.html', {})

def dashboard(request):
  return render(request, 'dashboard.html', {})


def results(request):
  if request.method == 'POST': 
    searched = request.POST['searched']
    searched.strip()
    searchKeys = ['title', 'authors', 'publisher', 'description', 'categories', 'publishedDate']
    api = "https://www.googleapis.com/books/v1/volumes?q="
    books = []

    for searchKey in searchKeys:
        resp = urlopen(api + searchKey + ':' + quote(searched))
        book_data = json.load(resp)
        for book in book_data['items']:
            info = book['volumeInfo']
            helpfulInfo = {'Title': info.get('title', ''),
                        'Authors': info.get('authors', ''),
                        'Publisher': info.get('publisher', ''),
                        'Description': info.get('description', ''),
                        'Categories': info.get('categories', ''),
                        'Rating': info.get('averageRating', 0),
                        'Ratings Count': info.get('ratingsCount', 0),
                        'Page Count': info.get('pageCount', 0),
                        'Publishing Date': info.get('publishedDate', 0)}
            if 'imageLinks' in info:
                helpfulInfo['CoverThumbnail'] = info.get('imageLinks')['thumbnail']
            else:
                helpfulInfo['CoverThumbnail'] = ''
            
            if 'industryIdentifiers' in info:
                helpfulInfo['ISBN'] = info.get('industryIdentifiers')[0]['identifier']
            else:
                helpfulInfo['ISBN'] = ''
            books.append(helpfulInfo)
    uniqueBooks = list({ each['ISBN'] : each for each in books }.values())
    uniqueBooks = list({ each['Title'] : each for each in uniqueBooks }.values())

    return render(request, 'results.html', {"searched": searched, "results": uniqueBooks})
  else: 
    return render(request, 'index.html', {})



def individual(request, isbn): 
    api = f'https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}'
    resp = urlopen(api) 
    book_data = json.load(resp) 
    title = book_data['items'][0]['volumeInfo']['title']
    author = book_data['items'][0]['volumeInfo']['authors'][0]
    description = book_data['items'][0]['volumeInfo']['description']

    reviews = Review.objects.filter(isbn=isbn)

  # image api
    api2 = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBeDvA8b63hEcqSR8GnUXcFRvleMGQTiac&cx=39129221a73b988b5&searchType=image&q="
    resp2 = urlopen(api2 + quote(isbn))

    img_data = json.load(resp2)
    firstImg = img_data['items'][0]
    firstImgLink = firstImg['link']
    

    return render(request, 'book.html/', {"title":title, "ISBN":isbn, "description":description, "author":author, "reviews":reviews, "image": firstImgLink})


def review(request, isbn): 
  if request.method == "POST":
    form = ReviewForm(request.POST)
    if form.is_valid():
      review = form.save(commit=False)
      review.user = request.user
      review.isbn = isbn
      review.save()
      return redirect('individual', isbn)
  else:
    review = ReviewForm 
    return render(request, 'review.html/', {'review':review})



def dashboard(request):
  return render(request, 'dashboard.html', {})

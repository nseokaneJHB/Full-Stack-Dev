from django.contrib import admin
from .models import *


admin.site.register(CommentModel)
admin.site.register(BlogModel)
admin.site.register(LikeModel)

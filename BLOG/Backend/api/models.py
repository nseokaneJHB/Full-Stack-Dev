from django.db import models
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class LikeModel(models.Model):
	author = models.ForeignKey(User, blank=True, on_delete=models.CASCADE)

	def __str__(self):
		return str(self.author)

	@receiver(post_save, sender=User)
	def create_like_author(sender, instance, created, **kwargs):
		if created:
			LikeModel.objects.create(author=instance)


class BlogModel(models.Model):
	author = models.ForeignKey(User, on_delete=models.CASCADE)
	post = models.TextField()
	likes = models.ManyToManyField(LikeModel, blank=True)
	time = models.TimeField(auto_now_add=True)
	date_created = models.DateField(auto_now_add=True)
 
	def __str__(self):
		return str(f"Blog: {self.post}")
	
 
class CommentModel(models.Model):
	author = models.ForeignKey(User, on_delete=models.CASCADE)
	comment = models.TextField()
	blog = models.ForeignKey(BlogModel, on_delete=models.CASCADE)
	likes = models.ManyToManyField(LikeModel, blank=True)
	time = models.TimeField(auto_now_add=True)
	date_created = models.DateField(auto_now_add=True)
	 
	def __str__(self):
		return str(f"Comment by Name: {self.author.username}")


	
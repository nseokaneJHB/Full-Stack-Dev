from django.db import models
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class ProfileModel(models.Model):
	user = models.OneToOneField(User, blank=True, on_delete=models.CASCADE)
	phone = models.CharField(max_length=10, blank=True)
	bio = models.TextField(blank=True)
	avatar = models.ImageField(blank=True)
	date_created = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return str(self.user)

	@receiver(post_save, sender=User)
	def create_profile(sender, instance, created, **kwargs):
		if created:
			ProfileModel.objects.create(user=instance)

	@receiver(post_save, sender=User)
	def save_profile(sender, instance, **kwargs):
		instance.profilemodel.save()


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
	instance.profilemodel.save()


class LikeModel(models.Model):
	author = models.OneToOneField(ProfileModel, on_delete=models.CASCADE)

	def __str__(self):
		return str(self.author)

	@receiver(post_save, sender=ProfileModel)
	def create_like_author(sender, instance, created, **kwargs):
		if created:
			LikeModel.objects.create(author=instance)


class BlogModel(models.Model):
	author = models.ForeignKey(ProfileModel, on_delete=models.CASCADE)
	post = models.TextField()
	likes = models.ManyToManyField(LikeModel, blank=True)
	time_created = models.TimeField(auto_now_add=True)
	date_created = models.DateField(auto_now_add=True)

	def __str__(self):
		return str(f"Blog: {self.post}")

	class Meta:
    		ordering = ['-date_created', '-time_created']
	
 
class CommentModel(models.Model):
	author = models.ForeignKey(ProfileModel, on_delete=models.CASCADE)
	blog = models.ForeignKey(BlogModel, on_delete=models.CASCADE)
	comment = models.TextField()
	likes = models.ManyToManyField(LikeModel, blank=True)
	time_created = models.TimeField(auto_now_add=True)
	date_created = models.DateField(auto_now_add=True)

	def __str__(self):
		return str(f"Comment by Name: {self.author}")

	class Meta:
    		ordering = ['-date_created', '-time_created']


	
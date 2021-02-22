from django.db import models


# Database model
class TODO(models.Model):
    task = models.CharField(max_length=250)
    complete = models.BooleanField(default=False)

    def __str__(self):
        return str(self.task)
        
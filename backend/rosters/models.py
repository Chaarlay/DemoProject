from django.db import models


class ClassBatch(models.Model):
    """
    Corresponds to groups of Learners led by an instructor, colloquially "classes".
    """
    name = models.TextField(max_length=100, blank=True, null=True)
    instructor = models.TextField(max_length=100, blank=True, null=True)


class Learner(models.Model):
    """
    Corresponds to a single student.
    """
    first_name = models.TextField(max_length=100, blank=True, null=True)
    last_name = models.TextField(max_length=100, blank=True, null=True)
    grade = models.TextField(max_length=2, blank=True, null=True)
    classbatch = models.ForeignKey(ClassBatch, on_delete=models.SET_NULL, null=True)


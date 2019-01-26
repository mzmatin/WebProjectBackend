from django.db import models


# Create your models here.

class Team(models.Model):
    avatar = models.ImageField(upload_to='images/')
    name = models.CharField(max_length=30)
    TYPE_CHOICES = (
        ('f', 'football'),
        ('b', 'basketball'),
    )
    type = models.CharField(max_length=1, choices=TYPE_CHOICES, default='football')


class Player(models.Model):
    avatar = models.ImageField(upload_to='images/')
    name = models.CharField(max_length=30)
    age = models.IntegerField()
    height = models.IntegerField()
    weight = models.IntegerField()
    nationality = models.CharField(max_length=30)
    position = models.CharField(max_length=20)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Staff(models.Model):
    avatar = models.ImageField(upload_to='images/')
    name = models.CharField(max_length=30)
    position = models.CharField(max_length=20)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)


class FootballPlayerStat(models.Model):
    season = models.CharField(max_length=30)
    goals = models.IntegerField()
    assists = models.IntegerField()
    appearance = models.IntegerField()
    red_cards = models.IntegerField()
    yellow_cards = models.IntegerField()
    best = models.IntegerField()
    player = models.ForeignKey(Player, on_delete=models.CASCADE)


class BasketballPlayerStat(models.Model):
    season = models.CharField(max_length=30)
    scores = models.IntegerField()
    triple_points = models.IntegerField()
    double_points = models.IntegerField()
    rebound = models.IntegerField()
    max_score_in_one_game = models.IntegerField()
    best = models.IntegerField()


class Match(models.Model):
    date = models.DateTimeField()
    home = models.ForeignKey(Team, on_delete=models.CASCADE)
    away = models.ForeignKey(Team, on_delete=models.CASCADE)
    stadium = models.CharField(max_length=30)

    # todo is type important?


class Event(models.Model):
    time = models.IntegerField()
    first_player = models.CharField(max_length=30)
    second_player = models.CharField(max_length=30, null=True)
    match = models.ForeignKey(Match, on_delete=models.CASCADE)

    class Meta:
        abstract = True
        ordering = ['time']


class FootballEvent(Event):
    EVENT_CHOICES = (
        ('rc', 'red-card'),
        ('yc', 'yellow-card'),
        ('pm', 'penalty-miss'),
        ('g', 'goal'),
        ('gp', 'goal(p)'),
        ('s', 'substitution'),
    )
    type = models.CharField(max_length=2, choices=EVENT_CHOICES)
    in_extra = models.BooleanField(verbose_name='happened in extra time')


class BasketballEvent(Event):
    EVENT_CHOICES = (
        ('tp', 'triple_point'),
        ('dp', 'double-point'),
        ('p', 'penalty'),
        ('pm', 'penalty-miss'),
        ('s', 'substitution'),
    )
    type = models.CharField(max_length=2, choices=EVENT_CHOICES)


class FootballStat(models.Model):
    corners = models.IntegerField()
    fouls = models.IntegerField()
    goals = models.IntegerField()
    possession = models.FloatField()
    shots = models.IntegerField()
    shots_on_target = models.IntegerField()
    passes = models.IntegerField()
    pass_accuracy = models.FloatField()
    yellow_cards = models.IntegerField()
    red_cards = models.IntegerField()
    offsides = models.IntegerField()
    WHEN_CHOICES = (
        ('f', 'first-half'),
        ('s', 'second-half'),
        ('t', 'total'),
    )
    when = models.CharField(max_length=1, choices=WHEN_CHOICES)
    match = models.ForeignKey(Match, on_delete=models.CASCADE)


class BasketballStat(models.Model):
    scores = models.IntegerField()
    triple_points = models.IntegerField()
    double_points = models.IntegerField()
    fouls = models.IntegerField()
    penalty_fouls = models.IntegerField()
    rebounds = models.IntegerField()
    WHEN_CHOICES = (
        ('fi', 'first'),
        ('se', 'second'),
        ('th', 'third'),
        ('fo', 'fourth'),
    )
    when = models.CharField(max_length=2, choices=WHEN_CHOICES)
    match = models.ForeignKey(Match, on_delete=models.CASCADE)


class MatchSummarySnippet(models.Model):
    title = models.CharField(max_length=50)
    text = models.TextField()
    time = models.IntegerField()
    match = models.ForeignKey(Match, on_delete=models.CASCADE)


class Media(models.Model):
    TYPE_CHOICES = (
        ('p', 'photo'),
        ('v', 'video'),
    )
    type = models.CharField(max_length=1, choices=TYPE_CHOICES)
    title = models.CharField(max_length=50)
    link = models.URLField()
    match = models.ForeignKey(Match, on_delete=models.CASCADE)

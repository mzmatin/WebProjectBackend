from django.contrib.auth.models import User
from django.db import models


# Create your models here.


class League(models.Model):
    picture_link = models.URLField()
    name = models.CharField(max_length=30)
    season_pre = models.IntegerField()
    season_post = models.IntegerField()

    def __str__(self):
        return self.name + " " + str(self.season_pre) + '-' + str(self.season_post)


class Team(models.Model):
    avatar = models.ImageField(upload_to='team_images/')
    name = models.CharField(max_length=30)
    TYPE_CHOICES = (
        ('f', 'football'),
        ('b', 'basketball'),
    )
    type = models.CharField(max_length=1, choices=TYPE_CHOICES, default='football')

    def __str__(self):
        return self.name


class FollowedTeam(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)


class TeamStat(models.Model):
    points = models.IntegerField()
    matches = models.IntegerField()
    won = models.IntegerField()
    drawn = models.IntegerField()
    lost = models.IntegerField()
    goals_for = models.IntegerField()
    goals_against = models.IntegerField()
    goals_difference = models.IntegerField()
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    league = models.ForeignKey(League, on_delete=models.CASCADE)


class Player(models.Model):
    avatar = models.ImageField(upload_to='player_images/')
    name = models.CharField(max_length=30)
    age = models.IntegerField()
    height = models.IntegerField()
    weight = models.IntegerField()
    nationality = models.CharField(max_length=30)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        abstract = True


class FootballPlayer(Player):
    POSITION_CHOICES = (
        ('gk', 'دروازبان'),
        ('dl', 'مدافع-چپ'),
        ('dc', 'مدافع-وسط'),
        ('dr', 'مدافع-راست'),
        ('ml', 'هافبک-چپ'),
        ('mc', 'هافبک-وسط'),
        ('mr', 'هافبک-راست'),
        ('fl', 'مهاجم-چپ'),
        ('fc', 'مهاجم-وسط'),
        ('fr', 'مهاجم-راست'),
    )
    position = models.CharField(max_length=2, choices=POSITION_CHOICES)


class BasketballPlayer(Player):
    POSITION_CHOICES = (
        ('pg', 'point-guard'),
        ('sg', 'shooting-guard'),
        ('c', 'center'),
        ('pf', 'power-forward'),
        ('sf', 'small-forward'),
    )
    position = models.CharField(max_length=2, choices=POSITION_CHOICES)


class Staff(models.Model):
    avatar = models.ImageField(upload_to='staff_images/')
    name = models.CharField(max_length=30)
    position = models.CharField(max_length=20)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)


class FootballPlayerStat(models.Model):
    goals = models.IntegerField()
    assists = models.IntegerField()
    appearance = models.IntegerField()
    red_cards = models.IntegerField()
    yellow_cards = models.IntegerField()
    best = models.IntegerField()
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    player = models.ForeignKey(FootballPlayer, on_delete=models.CASCADE)

    def __str__(self):
        return self.player.name + "'s stat--" + self.league.name + " " + str(self.league.season_pre) + "-" \
               + str(self.league.season_post)


class BasketballPlayerStat(models.Model):
    scores = models.IntegerField()
    triple_points = models.IntegerField()
    double_points = models.IntegerField()
    rebound = models.IntegerField()
    max_score_in_one_game = models.IntegerField()
    best = models.IntegerField()
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    player = models.ForeignKey(BasketballPlayer, on_delete=models.CASCADE)


class Match(models.Model):
    date = models.DateTimeField()
    stadium = models.CharField(max_length=30)
    week = models.IntegerField()
    home_score = models.IntegerField(null=True)
    away_score = models.IntegerField(null=True)
    home = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="home")
    away = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="away")
    league = models.ForeignKey(League, on_delete=models.CASCADE)


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
    media_link = models.URLField()
    match = models.ForeignKey(Match, on_delete=models.CASCADE)


class News(models.Model):
    title = models.CharField(max_length=50)
    TYPE_CHOICES=(
        ('b', 'basketball'),
        ('f', 'football'),
    )
    type = models.CharField(max_length=1, choices=TYPE_CHOICES)
    publish_date = models.DateTimeField()
    text = models.TextField()
    summary = models.TextField()
    picture_link = models.URLField()


class Tag(models.Model):
    name = models.CharField(max_length=30)
    news = models.ForeignKey(News, on_delete=models.CASCADE)


class Source(models.Model):
    name = models.CharField(max_length=30)
    news = models.ForeignKey(News, on_delete=models.CASCADE)


class Comment(models.Model):
    text = models.TextField()
    news = models.ForeignKey(News, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Reply(models.Model):
    text = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)


class Profile(models.Model):
    avatar = models.ImageField(upload_to='user_images/')
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

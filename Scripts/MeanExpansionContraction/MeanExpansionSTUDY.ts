# Modified PPO - plots 2 averages so you can compare 10vs20MA and 20vs50MA
# Pratik Shah
# 4/26/2020

declare lower;

input c = close;
input AvgType = AverageType.Exponential;
input nFast = 8;
input nSlow = 13;
input nFast2 = 8;
input nSlow2 = 13;

plot PPO = Round( ((MovingAverage(AverageType = AvgType, c, nFast) -
             MovingAverage(AverageType = AvgType, c, nSlow)) /
             MovingAverage(AverageType = AvgType, c, nSlow)) * 100, 2 );
PPO.SetDefaultColor(GetColor(5));
PPO.DefineColor("Positive", Color.GREEN);
PPO.DefineColor("Negative", Color.RED);
PPO.SetPaintingStrategy(PaintingStrategy.Histogram);
PPO.AssignValueColor(if PPO > 0
                     then PPO.color("Positive")
                     else  PPO.color("Negative"));

plot PPO2 = Round( ((MovingAverage(AverageType = AvgType, c, nFast2) -
             MovingAverage(AverageType = AvgType, c, nSlow2)) /
             MovingAverage(AverageType = AvgType, c, nSlow2)) * 100, 2 );
PPO2.SetDefaultColor(GetColor(5));
PPO2.DefineColor("Positive", Color.GREEN);
PPO2.DefineColor("Negative", Color.RED);
PPO2.SetPaintingStrategy(PaintingStrategy.Histogram);
PPO2.AssignValueColor(if PPO2 > 0
                     then PPO2.color("Positive")
                     else  PPO2.color("Negative"));

plot ZeroLine = 0;

# End Code PPO

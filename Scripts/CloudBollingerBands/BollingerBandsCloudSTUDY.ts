# Pratik Shah 
# 2/15/2021
# Bollinger Bands Modified to add Cloud visual


input price = close;
input displace = 0;
input length = 20;
input Num_Dev_Dn = -2.0;
input Num_Dev_up = 2.0;
input averageType = AverageType.Exponential;

# Define 2 colors one for upper band to midline and one for lower band to midline. You will never hace a scenario where Lower band > Mid line or Midline > Upper Band. You can change the default colors under GLOBAL in the settings

DefineGlobalColor("UpBand", CreateColor(121, 121, 121));
DefineGlobalColor("LowBand", CreateColor(121, 121, 121));

def sDev = stdev(data = price[-displace], length = length);

plot MidLine = MovingAverage(averageType, data = price[-displace], length = length);
plot LowerBand = MidLine + num_Dev_Dn * sDev;
plot UpperBand = MidLine + num_Dev_Up * sDev;

LowerBand.SetDefaultColor(GetColor(0));
MidLine.SetDefaultColor(GetColor(1));
UpperBand.SetDefaultColor(GetColor(5));

AddCloud(UpperBand, MidLine, GlobalColor("UpBand"), GlobalColor("UpBand"), no);
AddCloud(MidLine, LowerBand, GlobalColor("LowBand"), GlobalColor("LowBand"), no);

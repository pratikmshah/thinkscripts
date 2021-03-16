declare lower;

input length = 14;
input over_Bought = 70;
input sixty = 60;
input fifty = 50;
input forty = 40;
input over_Sold = 30;
input averageType = AverageType.WILDERS;
input showBreakoutSignals = no;
input price = close;


def NetChgAvg = MovingAverage(averageType, price - price[1], length);
def TotChgAvg = MovingAverage(averageType, AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

DefineGlobalColor("OverSold", CreateColor(0, 153, 255));
DefineGlobalColor("NotOverSold", CreateColor(99, 101, 102));
DefineGlobalColor("OverBought", CreateColor(255, 0, 0));
DefineGlobalColor("NotOverBought",  CreateColor(99, 101, 102));

plot RSI = 50 * (ChgRatio + 1);
plot OverSold = over_Sold;
plot OverBought = over_Bought;
plot SixtyRSI = sixty;
plot FiftyRSI = fifty;
plot FortyRSI = forty;
plot UpSignal = if RSI crosses above OverSold then OverSold else Double.NaN;
plot DownSignal = if RSI crosses below OverBought then OverBought else Double.NaN;

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

RSI.DefineColor("OverBought", GetColor(5));
RSI.DefineColor("Normal", GetColor(7));
RSI.DefineColor("OverSold", GetColor(1));
RSI.AssignValueColor(if RSI > over_Bought then RSI.color("OverBought") else if RSI < over_Sold then RSI.color("OverSold") else RSI.color("Normal"));
OverSold.SetDefaultColor(GetColor(8));
OverBought.SetDefaultColor(GetColor(8));
SixtyRSI.SetDefaultColor(GetColor(8));
FiftyRSI.SetDefaultColor(GetColor(8));
FortyRSI.SetDefaultColor(GetColor(8));
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);

AddCloud(RSI, OverBought, GlobalColor("OverBought"), GlobalColor("NotOverBought"), no);
AddCloud(RSI, OverSold, GlobalColor("NotOverSold"), GlobalColor("OverSold"), no);
# Percentages
# Pratik Shah 3/13/2021
# Calcualtes percentage draw downs in 10% incremenets bewteen high and low open/close for chart timeframe. 
# Optional extensions can be plotted on upside and downside.


def isLastBar = !IsNaN(close) and IsNaN(close[-1]); # Find Last bar

def highClose = HighestAll(close);
def lowClose = LowestAll(close);
def highOpen = HighestAll(open);
def lowOpen = LowestAll(open);
def highPrice = if highClose >= highOpen then highClose else highOpen;
def lowPrice = if lowClose <= lowOpen then lowClose else lowOpen;

def differ = AbsValue(highPrice - lowPrice);
input displacement = 5;

plot P100 = If(isLastBar[displacement], lowPrice, Double.NaN);
plot P90 = If(isLastBar[displacement], highPrice - (differ * .90), Double.NaN); # 10 percent down from high
plot P80 = If(isLastBar[displacement], highPrice - (differ * .80), Double.NaN); # 20 percent down from high ...
plot P70 = If(isLastBar[displacement], highPrice - (differ * .70), Double.NaN);
plot P60 = If(isLastBar[displacement], highPrice - (differ * .60), Double.NaN);
plot P50 = If(isLastBar[displacement], highPrice - (differ * .50), Double.NaN);
plot P40 = If(isLastBar[displacement], highPrice - (differ * .40), Double.NaN);
plot P30 = If(isLastBar[displacement], highPrice - (differ * .30), Double.NaN);
plot P20 = If(isLastBar[displacement], highPrice - (differ * .20), Double.NaN);
plot P10 = If(isLastBar[displacement], highPrice - (differ * .10), Double.NaN);
plot P0 = If(isLastBar[displacement], highPrice, Double.NaN);

P100.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
P90.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
P80.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
P70.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
P60.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
P50.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
P40.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
P30.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
P20.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
P10.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
P0.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

P100.SetDefaultColor(Color.WHITE);
P90.SetDefaultColor(Color.WHITE);
P80.SetDefaultColor(Color.WHITE);
P70.SetDefaultColor(Color.WHITE);
P60.SetDefaultColor(Color.WHITE);
P50.SetDefaultColor(Color.BLACK);
P40.SetDefaultColor(Color.WHITE);
P30.SetDefaultColor(Color.WHITE);
P20.SetDefaultColor(Color.WHITE);
P10.SetDefaultColor(Color.WHITE);
P0.SetDefaultColor(Color.WHITE);

# add extentions
input extensions = no;
input UpExt1 = 25;
input UpExt2 = 50;
input LowExt1 = 25;
input LowExt2 = 50;


plot UpperExt1 = If(extensions and isLastBar[displacement], ((UpExt1 / 100 + 1) * differ) + lowPrice, Double.NaN);
plot UpperExt2 = If(extensions and isLastBar[displacement], ((UpExt2 / 100 + 1) * differ) + lowPrice, Double.NaN);
plot LowerExt1 = If(extensions and isLastBar[displacement], lowPrice * (1 - AbsValue(LowExt1/100)), Double.NaN);
plot LowerExt2 = If(extensions and isLastBar[displacement], lowPrice * (1 - AbsValue(LowExt2/100)), Double.NaN);

UpperExt1.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
UpperExt2.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LowerExt1.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LowerExt2.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

UpperExt1.SetDefaultColor(Color.GREEN);
UpperExt2.SetDefaultColor(Color.GREEN);
LowerExt1.SetDefaultColor(Color.RED);
LowerExt2.SetDefaultColor(Color.RED);


# --------------------------------------------------------------
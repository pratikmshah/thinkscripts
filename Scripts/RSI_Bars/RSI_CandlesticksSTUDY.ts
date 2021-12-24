# Pratik Shah
# 11/18/2021    
# Candle Stick Colors change based on RSI Colors

def RSI = RSI();

DefineGlobalColor("RSI80", CreateColor(73, 129, 110));     # 80+ Dark Green
DefineGlobalColor("RSI70", CreateColor(137, 217, 177));    # 70 - 80 Green
DefineGlobalColor("RSI60", CreateColor(162, 237, 206));    # 60 - 70 Light Green
DefineGlobalColor("RSI50", CreateColor(239, 183, 1));      # 50 - 60 Yellow
DefineGlobalColor("RSI40", CreateColor(56, 149, 211));     # 40 - 50 Light Blue
DefineGlobalColor("RSI30", CreateColor(18, 97, 160));      # 30 - 40 Blue
DefineGlobalColor("RSI20", CreateColor(7, 47, 95));        # 30- Dark Blue

AssignPriceColor(
    if RSI >= 80 THEN GlobalColor("RSI80") 
    else if RSI < 80 AND RSI >= 70 THEN GlobalColor("RSI70")
    else if RSI < 70 AND RSI >= 55 THEN GlobalColor("RSI60")
    else if RSI < 55 AND RSI >= 50 THEN GlobalColor("RSI50")
    else if RSI < 50 AND RSI >= 40 THEN GlobalColor("RSI40")
    else if RSI < 40 AND RSI >= 30 THEN GlobalColor("RSI30") 
    else GlobalColor("RSI20") 
);
 // Tip calculator javascript function.
 function CalculateTotal() {
    // Getting the values entered.
    var price = document.getElementById("bill").value;
    var tipPer = document.getElementById("tipPercent").value;
    var evaluation = price;
    // Alert if no bill amount entered.
    if (evaluation == "")
        {
        alert("Please input the Bill Amount!");
        return false;
        }
    //Calculating the tip
    var per = tipPer;
    var tip = per * evaluation;
    var final = +tip + +evaluation;
    // Sending Tip and total to HTML document.
    document.getElementById("finalBill").value = final.toFixed(2);
    document.getElementById("printTip").value = tip.toFixed(2);
    }
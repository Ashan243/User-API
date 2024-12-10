

module.exports.lotsize = function(balance, risk){
    let lots;

    if((balance >= 100) && (risk > 0 && risk <= 5))
        if(risk/balance < 0.01  ){
                lots = 0.01
        }
        else {
            lots = risk/balance
        }

    return lots
}
 //short-circut or circut breaker
const getCombination = (cards, num) =>{
    const result = [];
    const backtrack = (start,combo) =>{
        if (combo.length === num){
            result.push([...combo]);
            return;
        }
        for (let i = start; i < cards.length; i ++){
            combo.push(cards[i]);
            backtrack(i + 1, combo);
            combo.pop();
        }
    }
    backtrack(0,[]);
    return result;
}
const valueRank = {
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "10":10,
    "J":11,
    "Q":12,
    "K":13,
    "A":14
}

const evaluateCards = (hand) => {
    const values = hand.map(card => valueRank[card.value]).sort((a,b) => b - a );
    const suits = hand.map(card => card.suit);
    const valueCounts = {};
    for (const v of values){
        valueCounts[v] = (valueCounts[v] || 0 ) + 1;
    }
    const flush = suits.every(s => s === suits[0]);
    const uniqueValues = [...new Set(values)].sort((a,b) => a - b ); 
    const straight = uniqueValues.length === 5 && (uniqueValues[4] - uniqueValues [0] === 4 || [14,2,3,4,5].every(v => uniqueValues.includes(v)));
    
    const counts = Object.values(valueCounts).sort((a,b) => b -a );
    const isFour = counts[0] === 4;
    const isThree = counts[0] === 3;
    const isPair = counts[1] >= 2;
    const numPairs = counts.filter(c => c === 2 ).length;
    let score = 0;
    let description = ' ';
    
    if (straight && flush ){
        score = 8;
        description = "Straight Flush";
    }else if (isFour){
        score = 7
        description = "Four of a kind";
    }else if (isThree && isPair){
        score = 6;
        description = "Full house";
    }else if (flush){
        score =5;
        description = "Flush";
    }else if (straight){
        score = 4;
        description = "Straight";
    }else if (isThree){
        score = 3;
        description = "Three of a Kind";
    }else if (numPairs === 2 ){
        score = 2 ;
        description = "Two Pairs";
    }else if (isPair ){
        score =1 ;
        description = "Pair";
    }else {
        score = 0;
        description = "High Card";
    }
    return {score , description};

    
}
const getBestHand = (hand) =>{
    const combination = getCombination(hand,5);
    let best = null;
    let bestScore = -1;
    let bestDesc = '';
    for (const combo of combination){
        const { score, description } = evaluateCards(combo);
        if (score > bestScore){
            best = combo;
            bestScore = score;
            bestDesc = description;
        }
    }
    return { best, bestScore, bestDesc };
}



module.exports = { getBestHand };


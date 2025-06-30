const getBestHand = (hand) =>{
    const combination = getCombinations(cards,5);
    let best = null;
    let bestScore = -1;
    let bestDesc = '';
    for (const combo of combination){
        const { score, description } = evaluateCards(hand);
        if (score > bestScore){
            best = hand;
            bestScore = score;
            bestDesc = description;
        }
    }
    return best;
}

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
const evaluateCards = (hand) => {
    const values = hand.map(card => card.value).sort((a,b) => b - a );
    const suits = hand.map(card => card.suits);
}

module.exports = { getBestHand };


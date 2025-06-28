const getBestHand = (hand) =>{
    const combination = getCombinations(cards,5);
    let best = null;
    let bestRank = null;
    for (const combo of combination){
        const rank = rankHand(combo);
        if (!bestHand || compareRanks(rank,bestRank) > 0){
            best = combo;
            bestRank = rank;
        }
    }
    return best;
}
const rankHand = (hand) =>{

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

module.exports = { getBestHand };

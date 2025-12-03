import React from 'react';
import { Box } from '@mui/material';

export const TournamentBracket = ({ data }) => {
  // Transform tournament data into Sankey diagram format
  const nodes = [];
  const links = [];
  const nodeMap = new Map();

  // Helper function to get or create node index
  const getNodeIndex = (name, round) => {
    const key = `${name}-${round}`;
    if (!nodeMap.has(key)) {
      nodeMap.set(key, nodes.length);
      nodes.push({ 
        name: name,
        category: round
      });
    }
    return nodeMap.get(key);
  };

  // Create nodes and links for each round
  data.forEach((round, roundIndex) => {
    round.matches.forEach(match => {
      const sourceWinner = getNodeIndex(match.winner, round.name);
      const sourceLoser = getNodeIndex(match.loser, round.name);
      
      if (roundIndex < data.length - 1) {
        // Create link to next round for winner
        const targetWinner = getNodeIndex(match.winner, data[roundIndex + 1].name);
        links.push({
          source: sourceWinner,
          target: targetWinner,
          value: match.winnerVotes
        });
      }
    });
  });

  // Prepare data for Sankey diagram
  const sankeyData = {
    nodes: nodes,
    links: links.map(link => ({
      source: link.source.toString(),
      target: link.target.toString(),
      value: link.value
    }))
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Use Auto-Visualiser's render_sankey tool */}
      <div id="tournament-bracket">
        {(() => {
          return (
            <function_calls>
            <invoke name="autovisualiser__render_sankey">
            <parameter name="data">{sankeyData}

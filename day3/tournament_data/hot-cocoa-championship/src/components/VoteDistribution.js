import React from 'react';
import { Box } from '@mui/material';

export const VoteDistribution = ({ data }) => {
  // Calculate total votes per recipe across all rounds
  const votesByRecipe = {};
  data.forEach(round => {
    round.matches.forEach(match => {
      votesByRecipe[match.winner] = (votesByRecipe[match.winner] || 0) + match.winnerVotes;
      votesByRecipe[match.loser] = (votesByRecipe[match.loser] || 0) + match.loserVotes;
    });
  });

  // Prepare data for the donut chart
  const chartData = {
    title: "Total Votes by Recipe",
    data: Object.entries(votesByRecipe).map(([recipe, votes]) => ({
      label: recipe,
      value: votes
    }))
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Use Auto-Visualiser's render_donut tool */}
      <div id="vote-distribution-chart">
        {(() => {
          return (
            <function_calls>
            <invoke name="autovisualiser__render_donut">
            <parameter name="data">{chartData}

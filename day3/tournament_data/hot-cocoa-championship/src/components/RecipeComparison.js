import React from 'react';
import { Box } from '@mui/material';

export const RecipeComparison = ({ data }) => {
  // Convert the data into the format needed for the radar chart
  const chartData = {
    labels: ["Richness", "Sweetness", "Creativity", "Presentation"],
    datasets: Object.entries(data).map(([name, scores], index) => ({
      label: name,
      data: [scores.richness, scores.sweetness, scores.creativity, scores.presentation]
    }))
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Use Auto-Visualiser's render_radar tool */}
      <div id="recipe-comparison-chart">
        {(() => {
          const radarData = {
            labels: chartData.labels,
            datasets: chartData.datasets
          };
          return (
            <function_calls>
            <invoke name="autovisualiser__render_radar">
            <parameter name="data">{radarData}

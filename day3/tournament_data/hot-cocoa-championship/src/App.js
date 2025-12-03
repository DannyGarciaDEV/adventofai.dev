import React, { useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const christmasTheme = createTheme({
  palette: {
    primary: {
      main: '#c62828', // Christmas red
    },
    secondary: {
      main: '#2e7d32', // Christmas green
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      color: '#c62828',
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      color: '#2e7d32',
      fontWeight: 600,
      fontSize: '2rem',
    },
  },
});

const tournamentData = {
  rounds: [
    {
      name: "Quarterfinals",
      matches: [
        { winner: "Classic Swiss Velvet", loser: "Spicy Mexican Mocha", winnerVotes: 234, loserVotes: 189 },
        { winner: "Peppermint Dream", loser: "Salted Caramel Swirl", winnerVotes: 312, loserVotes: 298 },
        { winner: "Dark Chocolate Decadence", loser: "White Chocolate Wonder", winnerVotes: 276, loserVotes: 203 },
        { winner: "Cinnamon Fireside", loser: "Hazelnut Heaven", winnerVotes: 267, loserVotes: 245 }
      ]
    },
    {
      name: "Semifinals",
      matches: [
        { winner: "Peppermint Dream", loser: "Classic Swiss Velvet", winnerVotes: 445, loserVotes: 398 },
        { winner: "Dark Chocolate Decadence", loser: "Cinnamon Fireside", winnerVotes: 512, loserVotes: 387 }
      ]
    },
    {
      name: "Championship",
      matches: [
        { winner: "Dark Chocolate Decadence", loser: "Peppermint Dream", winnerVotes: 678, loserVotes: 623 }
      ]
    }
  ],
  recipeDetails: {
    "Classic Swiss Velvet": { richness: 8, sweetness: 6, creativity: 4, presentation: 7 },
    "Spicy Mexican Mocha": { richness: 7, sweetness: 5, creativity: 9, presentation: 8 },
    "Peppermint Dream": { richness: 6, sweetness: 9, creativity: 7, presentation: 9 },
    "Salted Caramel Swirl": { richness: 9, sweetness: 8, creativity: 6, presentation: 7 },
    "Dark Chocolate Decadence": { richness: 10, sweetness: 5, creativity: 8, presentation: 10 },
    "White Chocolate Wonder": { richness: 5, sweetness: 10, creativity: 5, presentation: 6 },
    "Cinnamon Fireside": { richness: 7, sweetness: 7, creativity: 8, presentation: 8 },
    "Hazelnut Heaven": { richness: 8, sweetness: 7, creativity: 6, presentation: 7 }
  }
};

function App() {
  useEffect(() => {
    // Create Recipe Comparison (Radar Chart)
    const radarData = {
      labels: ["Richness", "Sweetness", "Creativity", "Presentation"],
      datasets: Object.entries(tournamentData.recipeDetails)
        .filter(([name]) => ["Dark Chocolate Decadence", "Peppermint Dream", "Classic Swiss Velvet", "Cinnamon Fireside"].includes(name))
        .map(([name, scores]) => ({
          label: name,
          data: [scores.richness, scores.sweetness, scores.creativity, scores.presentation]
        }))
    };

    // Create Vote Distribution (Donut Chart)
    const votesByRecipe = {};
    tournamentData.rounds.forEach(round => {
      round.matches.forEach(match => {
        votesByRecipe[match.winner] = (votesByRecipe[match.winner] || 0) + match.winnerVotes;
        votesByRecipe[match.loser] = (votesByRecipe[match.loser] || 0) + match.loserVotes;
      });
    });

    const donutData = {
      title: "Total Votes by Recipe",
      data: Object.entries(votesByRecipe).map(([recipe, votes]) => ({
        label: recipe,
        value: votes
      }))
    };

    // Create Tournament Bracket (Sankey Diagram)
    const nodes = [];
    const links = [];
    const nodeMap = new Map();

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

    tournamentData.rounds.forEach((round, roundIndex) => {
      round.matches.forEach(match => {
        const sourceWinner = getNodeIndex(match.winner, round.name);
        const sourceLoser = getNodeIndex(match.loser, round.name);
        
        if (roundIndex < tournamentData.rounds.length - 1) {
          const targetWinner = getNodeIndex(match.winner, tournamentData.rounds[roundIndex + 1].name);
          links.push({
            source: sourceWinner.toString(),
            target: targetWinner.toString(),
            value: match.winnerVotes
          });
        }
      });
    });

    const sankeyData = {
      nodes: nodes,
      links: links
    };

    // Render all visualizations using Auto-Visualiser
    window.autovisualiser.render_radar({ data: radarData });
    window.autovisualiser.render_donut({ data: donutData });
    window.autovisualiser.render_sankey({ data: sankeyData });
  }, []);

  return (
    <ThemeProvider theme={christmasTheme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h1" align="center" gutterBottom>
          🎄 Winter Festival Hot Cocoa Championship 🎄
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Paper elevation={3} sx={{ p: 3, mb: 4, background: 'rgba(255,255,255,0.9)' }}>
            <Typography variant="h2" gutterBottom>
              Tournament Bracket
            </Typography>
            <div id="tournament-bracket" style={{ height: '500px' }}></div>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 4, background: 'rgba(255,255,255,0.9)' }}>
            <Typography variant="h2" gutterBottom>
              Vote Distribution
            </Typography>
            <div id="vote-distribution" style={{ height: '400px' }}></div>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 4, background: 'rgba(255,255,255,0.9)' }}>
            <Typography variant="h2" gutterBottom>
              Recipe Comparison
            </Typography>
            <div id="recipe-comparison" style={{ height: '400px' }}></div>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

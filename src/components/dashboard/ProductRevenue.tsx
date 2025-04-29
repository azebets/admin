import { useEffect, useState } from 'react';
import { Badge, Table } from "flowbite-react";
import SimpleBar from "simplebar-react";
import { api } from 'src/services/api/api';

// Game icons
import crashIcon from "/src/assets/images/games/crash-icon.png";
import diceIcon from "/src/assets/images/games/dice-icon.png";
import minesIcon from "/src/assets/images/games/mines-icon.png";
import plinkoIcon from "/src/assets/images/games/plinko-icon.png";
import hiloIcon from "/src/assets/images/games/hilo-icon.png";

interface GameWin {
  game: string;
  player: string;
  payout: number;
  winAmount: number;
  userId: string;
  betId: string;
  timestamp: string;
}

const gameIcons: { [key: string]: string } = {
  crash: crashIcon,
  dice: diceIcon,
  mines: minesIcon,
  plinko: plinkoIcon,
  hilo: hiloIcon,
};

const ProductRevenue = () => {
  const [highestWins, setHighestWins] = useState<GameWin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighestWins = async () => {
      try {
        const response = await api.get('/admin/dashboard/highest-wins');
        setHighestWins(response.data.wins);
      } catch (error) {
        console.error('Error fetching highest wins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighestWins();
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg shadow-md bg-white pt-6 px-0 relative w-full break-words">
        <div className="px-6">
          <h5 className="card-title mb-6">Highest Wins</h5>
        </div>
        <SimpleBar className="max-h-[450px]">
          <div className="animate-pulse p-4">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </SimpleBar>
      </div>
    );
  }

  return (
    <div className="rounded-lg shadow-md bg-white pt-6 px-0 relative w-full break-words">
      <div className="px-6">
        <h5 className="card-title mb-6">Highest Wins</h5>
      </div>
      <SimpleBar className="max-h-[450px]">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-6">Game</Table.HeadCell>
              <Table.HeadCell>Player</Table.HeadCell>
              <Table.HeadCell>Payout</Table.HeadCell>
              <Table.HeadCell>Win Amount</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {highestWins.map((win, index) => (
                <Table.Row key={`${win.betId}_${index}`} className="bg-white">
                  <Table.Cell className="whitespace-nowrap ps-6">
                    <div className="flex gap-3 items-center">
                      <img
                        src={gameIcons[win.game.toLowerCase()]}
                        alt={`${win.game} icon`}
                        className="h-[40px] w-[40px] rounded-md"
                      />
                      <div className="truncate line-clamp-2 sm:text-wrap max-w-56">
                        <h6 className="text-sm text-gray-700">{win.game}</h6>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-sm text-gray-700">{win.player}</p>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge className="bg-lightprimary text-primary">
                      {win.payout.toFixed(2)}x
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <h4 className="text-gray-700">${win.winAmount.toLocaleString()}</h4>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </SimpleBar>
    </div>
  );
};

export default ProductRevenue;

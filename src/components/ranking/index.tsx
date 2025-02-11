import { IoMdPlay } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

interface StartGameProps {
  level: string;
  type: string;
}

interface RankingItem {
  id: number;
  name: string;
  amount: number;
}

export default function Ranking({ level, type }: StartGameProps) {
  const router = useRouter();
  const [ranking, setRanking] = useState<RankingItem[]>([]);

  // Recuperando o usuário do localStorage
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const id = (parsedUser as { id: string }).id;
      setUserId(id); // Armazena o id do usuário no estado
    }
  }, []);

  // Obtendo os dados do ranking
  useEffect(() => {
    async function getRanking() {
      try {
        const response = await axios.get("http://localhost:5107/api/Users/Rank");
        setRanking(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRanking();
  }, []);

  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    setIsDisabled(level === "" || type === "");
  }, [level, type]);

  // Função para iniciar o jogo
  async function startGame(userID: string) {
    try {
      const res = await axios.post("http://localhost:5107/api/Games", {
        userId: userID,
        amount: 0,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Função chamada ao clicar no botão de "Começar"
  const handleClick = () => {
    if (userId) {
      // Navega para a página do jogo
      router.push(`/game?level=${level}&type=${type}`);
      // Chama a função para iniciar o jogo
      startGame(userId);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg items-center grid place-items-center mb-16">
      <h1 className="text-4xl mb-4 font-bold text-center text-[#2263A3]">Ranking</h1>

      <div className="w-full h-80">
        {ranking.slice(0, 5).map((player, index) => (
          <div key={player.id} className="flex justify-between w-full items-center gap-2">
            <div className="flex justify-start gap-3 items-center bg-white p-2 mb-2 border-[1.5px] border-[#2263a3] rounded-md w-[70%]">
              <span className="font-bold">{index + 1}º</span>
              <span className="text-lg">{player.name}</span>
            </div>
            <div className="flex w-[30%] justify-center border-[1.5px] bg-white py-[9px] border-[#2263a3] mb-2 rounded-lg">
              <span>${player.amount}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} text-3xl flex items-center gap-2 bg-[#2263a3] text-white font-bold py-3 px-4 rounded-lg shadow-md focus:ring-4 focus:ring-blue-300 transition`}
        onClick={handleClick}
        disabled={isDisabled}
      >
        <span className="hover:text-amber-300 transition-all duration-300 flex items-center gap-2">
          Começar <IoMdPlay size={25} />
        </span>
      </button>
    </div>
  );
}

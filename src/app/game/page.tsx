"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@/components/container";
import Help from "@/components/help";
import Stop from "@/components/stop";
import Progress from "@/components/progress";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { withAuth } from "@/hooks/withAuth";
import { HeaderAux } from "@/components/header/header";
import { Footer } from "@/components/footer";

function Game() {
    const searchParams = useSearchParams();
    const level = searchParams.get("level") || "";
    const type = searchParams.get("type") || "";

    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAnswerOpen, setIsModalAnswerOpen] = useState(false);
    const [isAnswerIncorrect, setIsAnswerIncorrect] = useState(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [budget, setBudget] = useState(0);
    const [endGame, setEndGame] = useState(false);
    const [isMoHelp, setIsHelp] = useState(false);

    const [usedStop, setUsedStop] = useState(false);

    const values = ["1000", "5000", "50000", "100000", "300000", "500000", "1000000"]

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                []
                const res = await axios.get(`http://localhost:5107/api/Questions/${level}/${type}`);
                setQuestions(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar questões:", error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [level, type]);

    useEffect(() => {
        if (currentStep > 0) {
            setBudget(parseInt(values[currentStep - 1], 10));
        }
    }, [currentStep]);

    const selectAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        setIsModalOpen(true);
    };

    function end(){
        console.log("stop usado")
    }

    function help(){
        console.log("ajuda usada")
    }


    const confirmAnswer = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion.correctOption === selectedAnswer) {
            setIsAnswerCorrect(true);
        } else {
            setIsAnswerCorrect(false);
            setIsAnswerIncorrect(true);
        }
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isAnswerCorrect) {
            setIsModalAnswerOpen(true);
            increment();
            setCurrentQuestionIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                if (nextIndex < 7) {
                    return nextIndex;
                } else {
                    setCurrentStep(0);
                    return prevIndex;
                }
            });
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
        }
    }, [isAnswerCorrect, questions.length]);

    const closeModal = () => {
        setSelectedAnswer(null);
        setIsModalOpen(false);
    };

    const closeAnswerModal = () => {
        setIsModalAnswerOpen(false);
    }

    function increment() {
        setCurrentStep(prevStep => prevStep + 1);
    }

    const closeAnswerIncorrect = () => {
        setIsAnswerIncorrect(false);
    }

    return (
        <>
            <HeaderAux />
            <Container>
                {loading ? (
                    <p>Carregando questões...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : questions.length === 0 ? (
                    <p>Nenhuma questão encontrada.</p>
                ) : (
                    <div className="flex justify-between items-start gap-8 mt-8 mb-5 w-full h-ful">
                        <div className="flex flex-col bg-white px-4 w-3/4 h-full rounded-lg">
                            <h1 className="mt-3">{questions[currentQuestionIndex].statement}</h1>
                            <div className="mt-4">
                                {questions[currentQuestionIndex].options.map((answer: string, index: number) => (
                                    <button
                                        key={index}
                                        className="font-jost justify-center text-xl border-2 border-black block w-11/12 py-3 px-4 mt-2 rounded-lg bg-white text-left hover:text-[#2263a3] hover:border-[#2263A3]"
                                        onClick={() => selectAnswer(answer)}
                                        disabled={selectedAnswer !== null}
                                    >
                                        <div className="flex gap-3 items-center">
                                            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white">
                                                {String.fromCharCode(65 + index)}
                                            </span>
                                            {answer}
                                        </div>

                                    </button>
                                ))}
                            </div>
                        </div>

                        <section className="w-64 h-2/5">
                            <div className="mb-4 flex justify-between">
                                <div>
                                    <Help isHelp={() =>{
                                        setIsHelp(true);
                                        help();
                                    }}/>
                                </div>
                                <div>
                                    <Stop endGame={() => {
                                        setEndGame(usedStop);
                                        end();
                                    }}/>
                                </div>
                            </div>
                            <div>
                                <Progress currentStep={currentStep} increment={increment} />
                            </div>
                        </section>
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-80">
                            <h1 className="font-extrabold font-jost ">Confirmar reposta</h1>
                            <span className="font-jost">Tem certeza?</span>
                            <div className="mt-4 flex justify-center gap-5">
                                <button
                                    onClick={confirmAnswer}
                                    className="bg-green-500 flex items-center justify-center gap-1 text-xs w-24 text-white rounded-lg mr-4"
                                >
                                    Sim <AiOutlineCheck />
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="bg-red-500 flex gap-1 items-center justify-center text-white p-2 rounded-lg w-24"
                                >
                                    Não <AiOutlineClose />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {isModalAnswerOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-80">
                            <h1 className="font-extrabold font-jost">Resposta Correta!</h1>
                            <span className="text-sm">Prêmio: ${values[currentStep - 1]} </span>
                            <div className="flex justify-between">
                                <div></div>
                                <div className="right-0">
                                    <button onClick={closeAnswerModal} className="bg-[#2263a3] mt-3 text-sm px-3 py-2 text-white rounded-lg hover:text-yellow-300 transform transition-all duration-300">
                                        Proxima Pergunta
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
                {isAnswerIncorrect && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-80">
                            <h1 className="font-extrabold font-jost">Resposta Errada!</h1>
                            <span className="text-sm">Prêmio: ${values[currentStep - 1]} </span>
                            <div className="flex justify-between">
                                <div></div>
                                <div className="right-0">
                                    <button onClick={closeAnswerIncorrect} className="bg-[#2263a3] mt-3 text-sm px-3 py-2 text-white rounded-lg hover:text-yellow-300 transform transition-all duration-300">
                                        Continuar
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

            </Container>
            <Footer />
        </>
    );
}
export default withAuth(Game);
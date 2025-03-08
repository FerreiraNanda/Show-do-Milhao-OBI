"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { withAuth } from "@/hooks/withAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface User {
  name: string;
  nickname: string;
  email: string;
  amount: number;
  id: number,
  createdOn: string,
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [isDelete, setIsDelete] = useState(false);
  const { logOut } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const [nick, setNick] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogOut = () => {
    logOut();
    router.push('/login');
  }

  const handleDeleteClick = () => {
    setIsDelete((prevState) => !prevState);
  }

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5107/api/Users/${user?.id}`);
      router.push("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if(!user?.id) return;
      const editUser = {
        name: name || "" || user.name,
        nickname: nick || "" || user.nickname,
        email: email || "" || user.email,
        amount: user?.amount || 0,
        id: user?.id,
        createdOn: user?.createdOn|| "" || user.createdOn,
      }

      await axios.put(`http://localhost:5107/api/Users/Edit/${user?.id}`, editUser, {
        headers:{"Content-Type": "application/json"}
      });

      setUser(editUser);

      localStorage.setItem("user", JSON.stringify(editUser));

      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);
  


  return (
    <>
      <Header />
      <Container>
        <div className="flex mt-5 pb-16 p-3 justify-between w-full bg-white rounded">
          <div className="flex flex-row gap-3 w-11/12 ml-6">
            <div>
              <VscAccount size={80} />
            </div>

            <div className="flex flex-col w-full">
              {user ? (
                <>
                  <section className="flex justify-between">
                    <div>
                      <h1 className="text-2xl">{user.name}</h1>
                      <h2>{user.name}</h2>
                    </div>

                    <div className="gap-2 flex">
                      <button onClick={() => {setModalOpen(true)}} className="flex gap-2 items-center text-sm border-[1px] border-white px-3 h-11 rounded-lg text-[#2263a3] hover:border-[#2263A3]">
                        Editar Perfil <MdModeEdit />
                      </button>
                      <button onClick={handleDeleteClick} className="flex gap-2 items-center text-sm border-[1px] border-white px-3 h-11 rounded-lg text-[#2263a3] hover:border-[#2263A3]">
                        Excluir Conta <FaTrash />
                      </button>
                    </div>
                  </section>

                  <div className="pt-8 w-fit">
                    <h1 className="font-jost w-full border-b-[1px] border-black mb-4">
                      Endereço de Email: {user.email}
                    </h1>
                    <span className="text-[#2263a3] text-xl">Estatísticas</span>
                    <div className="flex gap-3 border-[1.5px] border-[#2263a3] rounded-lg items-center shadow-lg mt-4">
                      <h1 className="bg-[#2263a3] text-white w-28 px-1 py-7 text-xl rounded-lg whitespace-normal break-words text-center">
                        Prêmio Total
                      </h1>
                      <span className="text-5xl">
                        $ {user.amount}
                      </span>
                    </div>
                    <section className="flex w-full justify-between mt-4 text-5xl gap-4">
                      <div className="border-[1.5px] py-14 px-12 rounded-lg border-[#2263a3] flex flex-col items-center">
                        <span>12</span>
                        <span className="text-lg">Partidas</span>
                      </div>
                      <div className="border-[1.5px] py-14 px-10 rounded-lg border-[#2263a3] flex flex-col items-center">
                        <span>70</span>
                        <span className="text-lg">Questões</span>
                        <span className="text-lg">Respondidas</span>
                      </div>
                      <div className="border-[1.5px] py-14 px-12 rounded-lg border-[#2263a3] flex flex-col items-center">
                        <span>0</span>
                        <span className="text-lg">Paradas</span>
                      </div>
                      <div className="border-[1.5px] py-14 px-12 rounded-lg border-[#2263a3] flex flex-col items-center"> 
                        <span>7</span>
                        <span className="text-lg">Ajudas</span>
                      </div>
                    </section>
                  </div>

                  {isDelete && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                      <div className="bg-white p-6 rounded-lg w-80">
                        <h1 className="font-extrabold font-jost">Excluir Conta?</h1>
                        <span className="text-sm">Todos os seus dados serão apagados permanentemente</span>
                        <div className="flex justify-center gap-5 mt-4">
                          <button onClick={() => { handleDelete(); handleLogOut(); }} className="bg-white px-4 py-2 text-[#2262a3] border-[1px] border-[#2262a3] rounded-lg flex items-center gap-1 hover:shadow-xl transform transition-all duration-300 hover:outline-4">Excluir Conta</button>
                          <button onClick={handleDeleteClick} className="bg-white px-4 py-2 text-[#2263a3] border-[#2263a3] border-[1px] rounded-lg flex items-center gap-1 hover:shadow-xl transform transition-all duration-300 hover:outline-4">Cancelar </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {modalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                      <div className="flex flex-col items-center bg-white p-6 rounded-lg h-auto">
                        <h1 className="font-bold text-xl">Editar Perfil</h1>
                        <VscAccount size={70} />
                        <form className="flex flex-col mt-4 items-end gap-4">
                          <div>
                            <label>Nickname:</label>
                            <input type="text" onChange={(e) => setNick(e.target.value)} className="border-[1px] border-[#2263a3] p-1 rounded-md" />
                          </div>

                          <div>
                            <label>Nome Completo:</label>
                            <input type="text" placeholder={user.name} onChange={(e) => setName(e.target.value)} className="border-[1px] border-[#2263a3] p-1 rounded-md placeholder:text-gray-600" />
                          </div>

                          <div>
                            <label>Email:</label>
                            <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} className="border-[1px] border-[#2263a3] p-1 rounded-md placeholder:text-gray-600" />
                          </div>
                          <div>
                            <button onClick={handleEdit} className="bg-[#2263a3] p-[7px] rounded-lg text-sm text-white hover:text-yellow-300 transition-all duration-300">
                              Salvar
                            </button>
                            <button onClick={() => {setModalOpen(false)}} className="ml-5 text-[#2263a3] text-sm transform transition-all duration-500 hover:outline hover:outline-[1px] hover:outline-[#2263a3] px-3 py-[7px] rounded">
                              Cancelar
                            </button>

                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p>Carregando dados...</p>
              )}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
export default withAuth(Profile);

import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function About() {
    return (
        <>
            <Header />
            <main className="max-w-[1300px] px-3 mx-auto flex h-full py-3">
                <div className="bg-white mt-6 p-6 h-fit" >
                    <h1 className="font-bold text-[#2263a3] text-xl">Preparação para a Olimpíada Brasileira de Informática em Crateús:</h1>
                    <h1 className="text-[#2263a3] text-lg">Desenvolvimento de Raciocínio Lógico e Computacional para Aluno do Ensino Fundamental</h1>
                    <h1 className="text-[#2263a3] mt-4 font-semibold text-lg">Professor coordenador:</h1>
                    <h1>Rafael Martins Barros</h1>
                    <h1 className="mt-4 text-[#2263a3] font-semibold text-lg">Sobre o Projeto</h1>
                    <div className="mt-2">
                        Em Crateús, observou-se a necessidade de um projeto voltado para o ensino de lógica desde os primeiros anos da educação básica. Nesse contexto, a OBI surge como uma oportunidade inovadora para apresentar o campo da computação de maneira mais ampla, estimulando o desenvolvimento de habilidades essenciais, como criatividade, autonomia, raciocínio lógico, resolução de problemas, pensamento sistemático e trabalho em equipe.
                    </div>
                    <div className="mt-4">
                        Iniciou-se então um projeto de extensão voltado para o incentivo e preparação para a OBI, que vem sendo executado já a alguns anos pelo campus da UFC em Crateús, focado principalmente nos alunos do Ensino Médio e Superior da região.
                    </div>
                    <div className="mt-4">
                        No ano de 2024, ampliou-se este escopo, abrindo uma nova frente com um projeto específico para alunos do Ensino Fundamental.
                    </div>
                    <div className="mt-4">
                        Este projeto envolve atividades de resolução de questões de edições anteriores da OBI e a explicação de conceitos como Lógica Matemática, Contagem, Raciocínio Lógico e Algoritmos Básicos.
                    </div>
                    <div className="mt-4">
                        Seu objetivo é aumentar a participação na OBI e promover o interesse pela programação, demonstrando que é possível competir em nível nacional.
                    </div>
                    <h1 className="mt-3 text-[#2263a3] font-semibold text-lg">Escolas Participantes</h1>
                    <div className="mt-2">
                        Em seu primeiro ano o projeto levou 7 alunos à segunda fase do nível 1 de iniciação e 15 alunos à segunda fase do nível 2.
                    </div>
                    <h1 className="text-[#2263a3] mt-3 text-lg font-semibold">Próximos Passos</h1>
                    <div className="mt-3">
                        Os próximos passos do projeto incluem continuar a preparação dos alunos do Ensino Fundamental, focando não apenas no desenvolvimento de habilidades lógicas e de resolução de problemas, mas também na introdução gradual aos níveis de programação na Olímpiada. Dessa foprma, busca-se fornecer uma base sólida que permita aos alunos, no futuro, competir nos nívies mais avançados de programação, ampliando suas competências em ciência da computação e abrindo portas para novas oportunidades acadêmicas e profissionais.
                    </div>
                    <h1 className="text-[#2263a3] mt-10 font-semibold text-lg">Galeria</h1>
                    <section className="grid grid-cols-4 gap-2 min-w-[600px]">
                        <img src="/OBI1.png" alt="OBI" className="w-full mx-auto" />
                        <img src="/OBI2.png" alt="OBI"
                            className="w-full mx-auto" />
                        <img src="/OBI3.PNG" alt="OBI"
                            className="w-full mx-auto" />
                        <img src="/OBI4.PNG" alt="OBI"
                            className="w-full mx-auto" />
                    </section>
                    <div className="flex w-[49.5%] mt-2 gap-2">
                        <img src="/OBI5.PNG" alt="OBI"
                            className="w-full mx-auto object-contain" />
                        <img src="/OBI6.PNG" alt="OBI"
                            className="w-full mx-auto" />
                    </div>
                </div>
            </main>
            <Footer/>

        </>

    )
}
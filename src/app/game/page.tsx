import { Container } from '@/components/container';
import { Header } from '@/components/header';
import Help from '@/components/help';
import Progress from '@/components/progress';
import Stop from '@/components/stop';
import { notFound } from 'next/navigation'; // Para retornar erro caso os dados não sejam encontrados

interface GameProps {
  level: string;
  type: string;
  questions: any;
}

async function getQuestions(level: string, type: string) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/${type}/${level}`);
    if (!res.ok) {
      throw new Error('Erro ao buscar as questões');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Erro:', error);
    return null;
  }
}

export default async function Game({ params }: { params: { level: string; type: string } }) {
  const { level, type } = params;

  return (
    <>
      <Header />
      <Container>
        <div className="flex justify-between items-start gap-8 mt-8 mb-5 w-full">
          <h1 className="w-3/4">
            pergunta
          </h1>

          <section className="w-64 h-2/5">
            <div className="mb-4 flex justify-between">
              <div>
                <Help/> 
              </div>
              <div>
                <Stop/>
              </div>
              
            </div>
            <div>
              <Progress/>
            </div>


          </section>
        </div>
      </Container>

    </>

  );
}

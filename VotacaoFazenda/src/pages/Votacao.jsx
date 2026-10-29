import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService';
import ParticipanteCard from '../components/ParticipanteCard';

function Votacao() {
    const [ultimoVoto, setUltimoVoto] = useState(null);
    const [votosSessao, setVotosSessao] = useState(0);



    function handleVotar(p) {
        registrarVoto(p.id);
        setUltimoVoto(p);
        setVotosSessao(votosSessao + 1);
    }

    const naRoca = listarNaRoca();
    const foraRoca = listarForaDaRoca();

    return (
        <main className="votacao">
            <h2>Quem você quer eliminar?</h2>
            <p className="subtitulo">Cada clique conta um voto para tirar o peão da fazenda.</p>

            {ultimoVoto && (
                <div className="sucesso">
                    <span>
                        Voto registrado para eliminar <span className="destaque">{ultimoVoto.nome}</span>. Você já votou {votosSessao} {votosSessao === 1 ? 'vez' : 'vezes'}.
                    </span>
                    <Link to="/resultado" className="linkplacar">Ver resultado</Link>
                </div>
            )}

            <section className="blocoroca">
                <div className="grade-roca">
                    {naRoca.map((p) => (
                        <ParticipanteCard
                            key={p.id}
                            participante={p}
                            onVotar={handleVotar}
                        />
                    ))}
                </div>
            </section>

            <section className="blocooutros">
                <h3>Demais peões</h3>
                <p className="subtitulo">Fora da roça nesta semana, não podem receber votos.</p>
                <div className="grade-peoes">
                    {foraRoca.map((p) => (
                        <ParticipanteCard
                            key={p.id}
                            participante={p}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Votacao;

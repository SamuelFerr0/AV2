import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { obterVotos, calcularTotalVotos, calcularResultado, zerarVotos } from '../services/votacaoService';

function Resultado() {
    const [votos, setVotos] = useState(() => obterVotos());

    const total = calcularTotalVotos(votos);
    const resultado = calcularResultado(votos);

    function handleZerar() {
        if (window.confirm('Apagar todos os votos?')) {
            zerarVotos();
            setVotos({});
        }
    }

    if (total === 0) {
        return (
            <main className="resultado">
                <h2>Parcial da eliminação</h2>
                <div className="votos">
                    <span className="num">0</span> votos computados
                </div>

                <div className="vazio">
                    <p>Nenhum voto ainda. Escolha quem sai da roça para ver a parcial.</p>
                    <Link to="/votacao" className="btnvotar">Ir para a votação</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="resultado">
            <h2>Parcial da eliminação</h2>
            <div className="votos">
                <span className="num">{total}</span> {total === 1 ? 'voto computado' : 'votos computados'}
            </div>

            <div className="placar">
                {resultado.map((p, idx) => (
                    <div
                        key={p.id}
                        className={idx === 0 ? 'linha lider' : 'linha'}
                    >
                        <div className="boxpeao">
                            <img src={p.foto} alt={p.nome} className="fotovoto" />
                            <div className="infovotos">

                                <div className="nomelinha">
                                    <span className="nomepeao">{p.nome}</span>
                                    {idx === 0 && <span className="seloelimina">Sairia hoje</span>}
                                </div>

                                <div className="barra">
                                    <div
                                        className={`preenchido v${idx + 1}`}
                                        style={{ width: `${p.percentual}%` }}
                                    />
                                </div>

                                <span className="valores">
                                    {p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% ({p.votos} {p.votos === 1 ? 'voto' : 'votos'})
                                </span>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button type="button" className="btnzerar" onClick={handleZerar}>
                Zerar votação
            </button>
        </main>
    );
}

export default Resultado;

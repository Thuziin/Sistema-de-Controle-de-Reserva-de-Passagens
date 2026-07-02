import { useState } from "react";

import "../styles/ModalRegister.css"

interface ModalRegisterProps {
    aberto: boolean;
    onClose: () => void;
}

function ModalRegister({ aberto, onClose }: ModalRegisterProps) {
    const [cpf, setCPF] = useState("");
    const [Pnome, setPNome] = useState("");
    const [Unome, setUNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");

    if (!aberto) return null;

    async function cadastrarPessoa() {
        if (!cpf || !Pnome || !Unome || !senha) {
            alert("Os dados do formulário são obrigatórios");
            return ;
        }

        try {
            const response = await fetch("http://localhost:3000/api/cadastrarPessoa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cpf,
                    Pnome,
                    Unome,
                    email,
                    dataNascimento,
                    senha,
                    telefone,
                    endereco
                }),
            });

            if (!response.ok) {
                throw new Error();
            }

            alert("Usuário cadastrado com sucesso");

            onClose();

            window.location.reload();
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="overlayR">
            <div className="modalR">
                <h2 className="tituloR">Cadastro de nova pessoa</h2>
                <div className="forms">
                    
                    <div className="input-groupR">
                        <input 
                            type="tel"
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCPF(e.target.value)}
                            maxLength={11}
                            required
                        />
                    </div>

                    <div className="input-groupR">
                        <input 
                            type="text"
                            placeholder="Primeiro nome"
                            value={Pnome}
                            onChange={(e) => setPNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-groupR">
                        <input 
                            type="text"
                            placeholder="Sobrenome"
                            value={Unome}
                            onChange={(e) => setUNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-groupR">
                        <input 
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-groupR">
                        <input 
                            type="date"
                            placeholder="Data de Nascimento"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                        />
                    </div>

                    <div className="input-groupR">
                        <input 
                            type="password"
                            placeholder="Cadastre uma senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-groupR">
                        <input 
                            type="tel"
                            placeholder="telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>

                    <div className="input-groupR">
                        <input 
                            type="text"
                            placeholder="Endereço"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />
                    </div>
                </div>

                <button className="btnR" onClick={onClose}>Voltar</button>
                <button className="btnR" onClick={cadastrarPessoa}>Cadastrar</button>
            </div>
        </div>
    )

}

export default ModalRegister;
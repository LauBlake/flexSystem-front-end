import { useState } from "react";
import type { DealerUserInterface } from "../../Dealer/dealer.interface.ts";
import { useNavigate } from "react-router-dom";
import { authService } from "../../Users/service/authService.ts";
import { PasswordInput } from "../../../Core/components/PasswordInput.tsx";
import { TextInput } from "../../../Core/components/TextInput.tsx";


export const CreateDealer = () => {
  const navigate = useNavigate();

  const [newDealer, setNewDealer] = useState<DealerUserInterface>({
    username: "",
    password: "",
    passwordConfirm: "",
    dealer: {
      cuil: "",
      name: "",
      surname: "",
      phone: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Para campos raíz (username, password, etc.)
  const setUserField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDealer({
      ...newDealer,
      [name]: value,
    });
  }

  // 🔹 Para campos dentro del objeto nested dealer
  const setDealerField = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewDealer({
        ...newDealer,
        dealer: {
          ...newDealer.dealer,
          [name]: value,
        },
      });
    };

  const handleRegister = async () => {
    if (
      !newDealer.dealer.name ||
      !newDealer.dealer.cuil ||
      !newDealer.dealer.surname ||
      !newDealer.username ||
      !newDealer.dealer.phone ||
      !newDealer.password ||
      !newDealer.passwordConfirm
    ) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const data: DealerUserInterface = {
      username: newDealer.username,
      password: newDealer.password,
      passwordConfirm: newDealer.passwordConfirm,
      dealer: {
        name: newDealer.dealer.name,
        cuil: newDealer.dealer.cuil,
        surname: newDealer.dealer.surname,
        phone: newDealer.dealer.phone,
      },
    };

    setIsLoading(true);

    try {
      const response = await authService.registerDealer(data);

      if (response) {
        setTimeout(() => {
          setIsLoading(false);
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      alert("Error durante el registro: " + (error as Error).message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        
        {/* Header */}
        <div className="register-header">
          <h1>Flexisur</h1>
          <p>Crear Cuenta Dealer</p>
        </div>

        {/* Formulario */}
        <section className="register-section">

          {/* 1️⃣ Primera fila */}
          <div className="form-grid">
            <TextInput
              name="name"
              placeholder="Ingresar nombre"
              value={newDealer.dealer.name}
              setValue={setDealerField}
            />

            <TextInput
              name="cuil"
              placeholder="XX-XXXXXXXX-X"
              value={newDealer.dealer.cuil}
              setValue={setDealerField}
            />
          </div>

          {/* 2️⃣ Segunda fila */}
          <div className="form-grid">
            <TextInput
              name="surname"
              placeholder="Ingresar apellido"
              value={newDealer.dealer.surname}
              setValue={setDealerField}
            />

            <TextInput
              name="phone"
              placeholder="+54 9 11 XXXX-XXXX"
              value={newDealer.dealer.phone}
              setValue={setDealerField}
            />
          </div>

          {/* 3️⃣ Tercera fila */}
          <div className="form-grid">
            <TextInput  
              name= "username"
              placeholder="Nombre de usuario"
              value={newDealer.username}
              setValue={setUserField}
            />

            <PasswordInput
              name="password"
              placeholder="Mínimo 8 caracteres"
              value={newDealer.password}
              setValue={setUserField}
            />

            <PasswordInput
              name="passwordConfirm"
              placeholder="Repetir contraseña"
              value={newDealer.passwordConfirm}
              setValue={setUserField}
            />
          </div>

          {/* Botones */}
          <div className="button-container">
            <button
              type="button"
              className="btn-primary"
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isLoading && <div className="loading-spinner"></div>}
              {isLoading ? "Creando Dealer..." : "Crear Dealer"}
            </button>

          </div>

        </section>
      </div>
    </div>
  );
};
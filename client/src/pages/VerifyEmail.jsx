import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function VerifyEmail() {

  const { token } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [success, setSuccess] =
    useState(false);

  useEffect(() => {

    const verify = async () => {

      try {

        await api.get(
          `/auth/verify/${token}`
        );

        setSuccess(true);

      } catch (error) {

        setSuccess(false);

      } finally {

        setLoading(false);
      }
    };

    verify();

  }, [token]);

  if (loading) {

    return (
      <h2>
        Verificando cuenta...
      </h2>
    );
  }

  return (

    <div className="verify-page">

      {
        success ? (

          <>
            <h1>
              Cuenta verificada ✅
            </h1>

            <p>
              Ya podés iniciar sesión.
            </p>
          </>

        ) : (

          <>
            <h1>
              Link inválido ❌
            </h1>

            <p>
              El enlace expiró
              o no es válido.
            </p>
          </>
        )
      }

    </div>
  );
}

export default VerifyEmail;
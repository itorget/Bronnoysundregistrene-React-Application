// NASDAG media og design
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EnhetDetaljer = () => {
  const { orgNr } = useParams();
  const [enhet, setEnhet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnhet = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://data.brreg.no/enhetsregisteret/api/enheter/${orgNr}`
        );
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Network response was not ok: ${errorMessage}`);
        }
        const result = await response.json();
        setEnhet(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchEnhet();
  }, [orgNr]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>{enhet.navn}</h1>
      <p>Organisasjonsnummer: {enhet.organisasjonsnummer}</p>
      <p>
        Adresse:{" "}
        {enhet.forretningsadresse?.adresse || "Ingen adresse tilgjengelig"}
      </p>
      <p>
        Postnummer:{" "}
        {enhet.forretningsadresse?.postnummer ||
          "Ingen postnummer tilgjengelig"}
      </p>
      <p>
        Poststed:{" "}
        {enhet.forretningsadresse?.poststed || "Ingen poststed tilgjengelig"}
      </p>
      <p>
        Kommune:{" "}
        {enhet.forretningsadresse?.kommune || "Ingen kommune tilgjengelig"}
      </p>
      <p>Organisasjonsform: {enhet.organisasjonsform?.beskrivelse || "N/A"}</p>
      <p>Stiftelsesdato: {enhet.stiftelsesdato || "N/A"}</p>
      <p>Næringskode: {enhet.naeringskode1?.beskrivelse || "N/A"}</p>
      <p>Aktivitet: {enhet.aktivitetsbeskrivelse || "N/A"}</p>
      <p>Antall Ansatte: {enhet.antallAnsatte || "N/A"}</p>
      <p>
        Hjemmeside:{" "}
        <a href={enhet.hjemmeside} target="_blank" rel="noopener noreferrer">
          {enhet.hjemmeside || "N/A"}
        </a>
      </p>
    </div>
  );
};

export default EnhetDetaljer;

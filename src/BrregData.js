// NASDAG media og design
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BrregData = () => {
  const [data, setData] = useState([]);
  const [latestData, setLatestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLatestData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://data.brreg.no/enhetsregisteret/api/enheter?size=100"
        ); // Hent en batch med oppføringer
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Network response was not ok: ${errorMessage}`);
        }
        const result = await response.json();
        const sortedData = result._embedded.enheter.sort(
          (a, b) =>
            new Date(b.registreringsdato) - new Date(a.registreringsdato)
        );
        setLatestData(sortedData.slice(0, 10)); // Ta de siste 10 oppføringene
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchLatestData();
  }, []); // Hent de siste oppføringene ved første rendering

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${searchTerm}&size=10`
        );
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Network response was not ok: ${errorMessage}`);
        }
        const result = await response.json();
        setData(result._embedded.enheter || []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchData();
    } else {
      setData([]);
    }
  }, [searchTerm]); // Hent nye data når searchTerm endres

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const renderEnhet = (enhet) => {
    return (
      <li key={enhet.organisasjonsnummer}>
        <Link to={`/enhet/${enhet.organisasjonsnummer}`}>
          <h3>
            {enhet.navn} (Org.nr: {enhet.organisasjonsnummer})
          </h3>
        </Link>
        <p>Kommune: {enhet.forretningsadresse?.kommune || "N/A"}</p>
        <p>Poststed: {enhet.forretningsadresse?.poststed || "N/A"}</p>
        <p>
          Organisasjonsform: {enhet.organisasjonsform?.beskrivelse || "N/A"}
        </p>
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
      </li>
    );
  };

  return (
    <div>
      <h1>Søk i Brønnøysundregistrene</h1>
      <input
        type="text"
        placeholder="Søk etter enhet"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h2>Søkeresultater</h2>
      <ul>{data.map(renderEnhet)}</ul>
      {loading && <div>Loading...</div>}
      <h2>Siste oppføringer</h2>
      <ul>{latestData.map(renderEnhet)}</ul>
    </div>
  );
};

export default BrregData;

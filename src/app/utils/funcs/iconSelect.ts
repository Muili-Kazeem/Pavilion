import { IconDefinition, faCediSign, faDollar, faEuro, faNairaSign, faPoundSign, faYen } from "@fortawesome/free-solid-svg-icons";

export function iconSelect(name: string): IconDefinition {
  switch (name) {
    case 'usd':
      return faDollar;
    case 'ngr':
      return faNairaSign;
    case "gha":
      return faCediSign;
    case "gbr":
      return faPoundSign;
    case 'jpy':
      return faYen;
    case 'eur':
      return faEuro;
    default:
      return faDollar;
  }
}

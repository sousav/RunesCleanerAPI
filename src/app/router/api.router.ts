import {Router} from "express";
import {RunesRouter} from "./runes.router";
import {VKeyRemoverMiddleware} from "../middleware/vkey.remover.middleware";
import {AuthRouter} from "./auth.router";
import {ApiErrorMiddleware} from "../middleware/api.error.middleware";

export class ApiRouter {

    private readonly router: Router;

    constructor() {
        this.router = Router();
        this.router.use(VKeyRemoverMiddleware.handler);

        this.router.use("/auth", new AuthRouter().get());
        this.router.use("/runes", new RunesRouter().get());

        this.router.use(ApiErrorMiddleware.handler);
        this.router.get('/date', (req, res, next) => {
            res.status(200).json(
                {
                    1791 : 'Loi Le Chapelier sur l’interdiction des associations ouvrières et des coalitions.',
                    1804 : 'L’article 1781 du Code civil consacre l’infériorité légale de l’ouvrier face à l’employeur.',
                    1806 : 'Création des conseils de prud’hommes.',
                    1814 : 'Loi sur le repos dominical.',
                    1840 : 'Villermé publie son Tableau de l’état physique et moral des ouvriers employés dans les filatures de coton, de laine et de soie.',
                    '1841 1' : 'Loi relative au travail des enfants employés dans les manufactures, usines et ateliers.',
                    '1841 2' : 'Création de l’inspection du travail des enfants en France.',
                    1848 : 'Révolution de 1848. Création de la commission du Luxembourg, considérée comme la première administration du travail en France.',
                    1864 : 'Abolition du délit de coalition par la Loi Ollivier.',
                    1868 : 'Abrogation de l’article 1781 du Code civil.',
                    1880 : 'Abrogation de la loi sur le repos dominical.',
                    1884 : 'Loi Waldeck-Rousseau sur les syndicats professionnels.',
                    1892 : 'Création d’un corps unique d’inspecteurs du travail d’État en France.',
                    '1893 1' : 'Loi sur l’hygiène et la sécurité dans les établissements industriels.',
                    '1893 2' : 'Loi du 15 juillet 1893 sur l\'assistance médicale.',
                    1895 : 'Création de la Confédération générale du travail (CGT).',
                    1898 : 'Loi sur les accidents du travail.',
                    1906 : 'Rétablissement du repos dominical. Création du ministère du Travail.',
                    1919 : 'Loi des huit heures. Création de la Confédération française des travailleurs chrétiens (CFTC).',
                    1936 : 'Accords Matignon: semaine de quarante heures, congés payés, droit de se syndiquer librement, instauration du délégué du personnel, augmentation des salaires de 7 à 12%, loi sur les convention collective de travail.',
                    '1936 1' : 'Réforme de la banque de France.',
                    '1936 2' : 'Mise en place du billet de congé annuel.',
                    1941 : 'Instauration du régime de retraite par répartition et du minimum vieillesse par la loi du 14 mars 1941, et création de la charte du travail du 4 octobre 1941 rédigée par le syndicaliste René Belin.',
                    1944 : 'Adoption du programme du Conseil national de la Résistance (CNR). Abrogation de la Charte du travail. Création de la Confédération générale des cadres (CGC). Droit de vote des femmes.',
                    1945 : 'Instauration des comités d’entreprise et du contrôle de l’emploi. Création de la Sécurité sociale.',
                    1946 : 'Le préambule de la constitution de la IVe République reconnaît le droit à l’emploi et le droit de grève. Création du Conseil national du patronat français (CNPF).',
                    1947 : 'Création de la Confédération générale du travail - Force ouvrière (CGT-FO).',
                    1950 : 'Instauration du salaire minimum interprofessionnel garanti (SMIG).',
                    1956 : 'Loi sur la troisième semaine de congés payés.',
                    1958 : 'Adoption de la constitution de la Ve République, qui reprend à son compte le préambule de 1946, dont la valeur constitutionnelle sera établie par la décision du Conseil constitutionnel du 16 juillet 1971. Création de l’Union nationale interprofessionnelle pour l’emploi dans l’industrie et le commerce (Unedic).',
                    1963 : 'Loi sur la quatrième semaine de congés payés.',
                    1964 : 'Création de la Confédération française démocratique du travail (CFDT).',
                    1966 : 'L\'ANIFRMO, créée en 1949, devient l\'Association pour la formation professionnelle des adultes (AFPA).',
                    1967 : 'Création de l’Agence nationale pour l’emploi (ANPE).',
                    1968 : 'Mai 68. Accords de Grenelle. Loi relative à l’exercice du droit syndical dans l’entreprise.',
                    1970 : 'Instauration du salaire minimum interprofessionnel de croissance (SMIC).',
                    1971 : 'Loi sur la formation professionnelle.',
                    1973 : 'Création de la Confédération européenne des syndicats (CES). Loi sur la résiliation unilatérale du contrat de travail. Loi Royer sur la grande distribution qui, pour préserver le commerce et l\'artisanat, oblige à requérir une autorisation pour ouvrir des grandes surfaces commerciales.',
                    1975 : 'Loi sur l’autorisation administrative de licenciement.',
                    1977 : 'Accord interprofessionnel sur la mensualisation.',
                    1981 : 'Élection du candidat socialiste, François Mitterrand, à la présidence de la République.',
                    1982 : 'Instauration de la semaine de trente-neuf heures et de la cinquième semaine de congés payés, en vertu d’un accord interprofessionnel signé l’année précédente. Lois Auroux sur le droit d’expression et la négociation collective. Création de l\'impôt sur les grandes fortunes, transformé en 1989 en impôt de solidarité sur la fortune.',
                    1983 : 'Fixation de l’âge légal de la retraite à soixante ans.',
                    1986 : 'Première cohabitation: gouvernement Chirac. Suppression de l’autorisation administrative de licenciement.',
                    1987 : 'Loi Séguin sur l’aménagement du temps de travail.',
                    1988 : 'Retour de la gauche, gouvernement Rocard. Création du Revenu minimum d\'insertion.',
                    1989 : 'Loi sur la prévention du licenciement économique et le droit à la conversion.',
                    1992 : 'Texte annulant les procédures de licenciement non accompagnées de plan de reclassement.',
                    1993 : 'Loi quinquennale relative au travail, à l’emploi et à la formation professionnelle.',
                    1996 : 'Loi de Robien sur l’aménagement et la réduction du temps de travail. Loi Raffarin qui renforce les dispositions de la Loi Royer de 1973 sur la grande distribution.',
                    1998 : 'La loi Aubry prévoit l’instauration de la semaine de trente-cinq heures à partir du 1er janvier 2000 dans les entreprises de plus de vingt salariés et à partir du 1er janvier 2002 dans les autres entreprises. Le CNPF prend le nom de Mouvement des entreprises de France (Medef).',
                    1999 : 'Couverture maladie universelle.',
                    2002 : 'Loi de modernisation sociale.',
                    2003 : 'Loi Fillon sur la réforme des retraites.',
                    2005 : 'Loi de cohésion sociale préparée par le Ministre du Travail et des Affaires sociales Jean-Louis Borloo (gouvernement Raffarin et Villepin)',
                    2007 : 'Loi TEPA (ou « paquet fiscal »), qui contient entre autres une mesure de défiscalisation des heures supplémentaires (gouvernement Fillon).',
                    2008 : 'Loi de modernisation de l\'économie, qui supprime notamment la limite de 300 m² prévue dans le cadre de la loi Raffarin de 1996 au-delà desquels les grandes surfaces commerciales doivent requérir une autorisation pour ouvrir',
        }
        );
        })
    }

    public get(): Router {
        return this.router;
    }
}

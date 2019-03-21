import * as SurveySearch from './SurveySearch';
import * as Survey from './Survey';
import * as Code from './Code';
import * as Layout from './Layout';
import * as Session from './Session';
import * as Case from './Case';
import * as SurveyQuestion from './SurveyQuestion';
import * as Outbreak from './Outbreak';
import * as ELRSearch from './ELRSearch';
import * as SmartGoals from './SmartGoals';
import { SmartGoalsState } from './SmartGoals';

// The top-level state object
export interface ApplicationState {
    surveys: SurveySearch.SurveySearchState;
    survey: Survey.SurveyState;
    codes: Code.CodeState;
    layout: Layout.LayoutState;
    surveyQuestion: SurveyQuestion.SurveyQuestionState;
    session: Session.SessionState;
    case: Case.CaseState;
    outbreak: Outbreak.OutbreakState;
    elrSearch: ELRSearch.ELRSearchState;
    smartGoals: SmartGoals.SmartGoalsState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    surveys: SurveySearch.reducer,
    survey: Survey.reducer,
    codes: Code.reducer,
    layout: Layout.reducer,
    questions: SurveySearch.reducer,
    session: Session.reducer,
    case: Case.reducer,
    surveyQuestion: SurveyQuestion.reducer,
    outbreak: Outbreak.reducer,
    elrSearch: ELRSearch.reducer,
    smartGoals: SmartGoals.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): any;
}

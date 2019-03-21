import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { actionCreators as ElrSearchActions, TemplateType } from '../../store/ELRSearch';
import { isNullOrEmpty } from '../../utils/UIUtils';
import Alert from '../common/Alert';
import TextInput from '../common/TextInput';
import SaveDeleteButton from '../common/SaveDeleteButtons';
import { toast } from 'react-toastify';
import Secure from '../common/Secure';
import YesNo from '../common/YesNo';
import { ClaimType, Role } from '../../store/Session';
import { defaults } from '../../utils/Global';


type TemplateInfoBarProps = {
    name: string
    id: number
    type: string
} & typeof ElrSearchActions;

class TemplateInfoBar extends React.Component<TemplateInfoBarProps>{

    state = {
        errors: {} as any,
        name: defaults.string,
        id: defaults.number,
        isMasterTemplate: defaults.boolean,
        loading: false,
    };

    constructor(props: TemplateInfoBarProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    public componentWillReceiveProps(newProps: TemplateInfoBarProps) {

        const { name, id, type } = newProps
        const isMasterTemplate = (type == TemplateType.master)

        if (id == 0)
            this.setState({
                name: defaults.string,
                id: defaults.number,
                isMasterTemplate: defaults.boolean
            });
        else
            this.setState({
                name: name,
                id: id,
                isMasterTemplate: isMasterTemplate
            });
    }

    private onChange(name: string, newValue: any) {
        const newState = Object.assign({}, this.state) as any;
        newState[name] = newValue;
        this.setState(newState);
    }

    private async onRemove() {
       await this.props.deleteTemplate();
        toast.success(" Deleted Successfully");
    }

    private async onSave(event: any) {
        event.preventDefault();

        this.setState({ loading: true });

        try {
            const { name, isMasterTemplate } = this.state
            const type = (isMasterTemplate == true) ? TemplateType.master : TemplateType.user;
 
            await this.props.saveTemplate(name, this.props.id, type);
            toast.success(" Saved Successfully");
            await this.props.loadTemplates();

        }
        catch (errors) {
            const keys = Object.keys(errors);
            if (keys.length > 0) {
                keys.map(key => errors[key].map((error: string) => toast.error(error)));
            }
        } finally {
            this.setState({ loading: false });
        }

    }

    public render() {
        const { name, id, isMasterTemplate, loading } = this.state

        if (isNullOrEmpty(this.props.name)) return "";

        return <Alert alertType="info">

            <div className="row justify-content-between">
                <TextInput
                    name='name'
                    label='Template Name'
                    value={name}
                    hideLabel={true}
                    cols={4}
                    onChange={this.onChange}
                    placeholder={"Enter Template Name"}
                />

                <Secure requireClaim={ClaimType.role} requireClaimValue={[Role.Admin]}>

                    <div className="row ml-4">
                        <span> Master? &nbsp;</span>

                        <YesNo
                            name={"isMasterTemplate"}
                            label={""}
                            value={isMasterTemplate}
                            hideLabel={true}
                            isBoolean={true}
                            onChange={this.onChange}
                        />
                    </div>
                </Secure>

                <SaveDeleteButton
                    saveOnClick={this.onSave}
                    deleteOnClick={this.onRemove}
                    deleteDisabled={id == 0}   
                    saveDisabled={loading}
                    saveButtonText={loading ? 'Saving...' : 'Save'}
                />
            </div>
        </Alert>
    }

}

export default connect(
    (state: ApplicationState) => {
        return {
            name: state.elrSearch.templateName,
            id: state.elrSearch.templateID,
            type: state.elrSearch.templateType
        };
    },
    ElrSearchActions
)(TemplateInfoBar);

import React, {useRef} from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { Button, ButtonGroup, Form,} from "react-bootstrap";
import { BASED_URL, BRANDS_URL, } from "../../urls/Urls";
import { IColor, IBrand, IModel, IEngineType, IYearRelease } from "../../interfaces/IEntity"
import ImageUploading, { ImageListType } from "react-images-uploading";
import { CirclePicker } from 'react-color';
import SimpleReactValidator from 'simple-react-validator';
import AuthService from "../../services/AuthService";
import {  withRouter} from 'react-router-dom';

interface IAdsAppendPageState {
    colors: IColor[],
    brands: IBrand[],
    models: IModel[],
    years: IYearRelease[],
    engineTypes: IEngineType[],
    fullModels: IModel[],
    images: any[],
    mileage:string,
    validator: any,
    vinNumber: string,
    showEngineType: boolean,
    showYearRelease: boolean,
    showModificataion:boolean,
    showModel:boolean,
    contactPhone:string,
    currentBrandId:number,
    modelName:string,
    currentEngineTypeId:number,
    currentYearRelease:number,
    currentModelId: number,
    currentColorHexCode: string,
    countOwners: number,
    price:number,
    plateNumber:string,
    description: string,
}

interface IAdsAppendPageProps extends RouteComponentProps{

}


class AdsAppendPage extends React.Component<IAdsAppendPageProps, IAdsAppendPageState> {
    state = {
        colors: [],
        brands: [],
        models: [],
        years: [],
        images: [],
        fullModels: [],
        mileage:"100000",
        engineTypes: [],
        validator: new SimpleReactValidator(),
        vinNumber:"SEFSDF2342RETW",
        showEngineType:false,
        showYearRelease:false,
        showModificataion:false,
        showModel:false,
        contactPhone:"78094325232",
        currentBrandId:0,
        modelName:"",
        currentEngineTypeId:0,
        currentYearRelease:0,
        currentModelId: 9,
        currentColorHexCode: "#000000",
        countOwners: 1,
        price:100000,
        plateNumber:"АА200А72",
        description:"Такая то машина"
    }

    async http<T>(request: string): Promise<T> {
        const response = await fetch(request);
        const body = await response.json();
        return body;
    }


    async componentDidMount() {
        this.state.validator = new SimpleReactValidator({
            messages: {
                default: 'Validation has failed!',
            },
        })
        const brands = await this.http<IBrand[]>(BASED_URL + BRANDS_URL);
        this.setState({
            brands:brands,
        })
    }

    async onChangeBrand(event : any) {
        console.log(event.target.value)
        this.setState({
            showModel:true,
            showEngineType:false,
            showYearRelease:false,
            showModificataion:false,
            currentBrandId: event.target.value
        })
        axios.get('http://localhost:4002/api/models/brand/'+ event.target.value).then( res =>
            {
                this.setState({models: res.data})
                this.dropDownListModels.value = "Выберите модель";
            }
        )
    }

    async onChangeModel(event : any){
        event.preventDefault()
        this.setState({
            showEngineType:true,
            showYearRelease:false,
            showModificataion:false,
            modelName: event.target.value,
        })

        axios.get('http://localhost:4002/api/models/engine/type', {
            params: {
                name: event.target.value
            }
        })
            .then( res => {
                console.log(event.target.value);
                this.setState({engineTypes: res.data});
                this.dropDownListEngineType.value = "Выберите тип двигателя";
            })
    }

    async onChangeEngineType(event : any){
        event.preventDefault()
        this.setState({
            showYearRelease:true,
            showModificataion:false,
            currentEngineTypeId:event.target.value,
        })

        axios.get('http://localhost:4002/api/models/years', {
            params: {
                engine_type_id: event.target.value,
                name: this.state.modelName
            }
        })
            .then( res => {
                console.log(event.target.value);
                this.setState({years: res.data});
                this.dropDownListYearRelease.value = "Выберите год выпуска авто";
            })
    }

    async onChangeYearRelease(event:any){
        event.preventDefault()
        this.setState({
            showModificataion:true,
            currentYearRelease:event.target.value
        })
        console.log(event.target.value, this.state.modelName, this.state.currentEngineTypeId)
        axios.get('http://localhost:4002/api/models/parametrs', {
            params: {
                engine_type_id: this.state.currentEngineTypeId,
                name: this.state.modelName,
                yearRelease: event.target.value,
            }
        })
            .then( res => {
                this.setState({fullModels: res.data});
                console.log(res.data)
            })

    }

    async onModificationChange(event: any){
        this.setState({
            currentModelId: event.target.value
        })
    }

    onChange (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) {
        // data for submit

        console.log(imageList, addUpdateIndex);
        this.setState({
            images: imageList
        });
    };

    handleChange(e: any) {
        e.preventDefault()
        console.log(this.state.validator);
        this.setState({ [e.target.name]: e.target.value } as Pick<IAdsAppendPageState, any>)
    }

    handleSubmit(e: any){
        e.preventDefault();
        axios.post('http://localhost:4002/api/ad/create', {
            vin: this.state.vinNumber,
            plateNumber: this.state.plateNumber,
            currentModelId: this.state.currentModelId,
            mileage: this.state.mileage,
            hexColorCode: this.state.currentColorHexCode,
            description: this.state.description,
            countOwners: this.state.countOwners,
            contactPhone: this.state.contactPhone,
            price: this.state.price,
            userId: AuthService.getUser().id
        })
            .then((response) => {
                this.props.history.push('/user/ads');
            }, (error) => {
                alert(error);
            });
    }

    private dropDownListModels: any;
    private dropDownListEngineType: any;
    private dropDownListYearRelease: any;

    render() {
        const { colors, brands, models, years, images, mileage, validator, engineTypes, fullModels } = this.state;

        return (
            <>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                <div className='container col-md-12'>
                    <p></p>
                    <div className='row'>
                        <h2>Подать объявление о продаже авто</h2>
                    </div>
                    <p></p>
                    <div className='row'>
                        <div className='col-10 fon'>
                            <div className='row p-3'>
                                <div className='col-2 '>
                                    VIN-номер
                                </div>
                                <div className='col-5 '>
                                    <div className="form-group">
                                        <input className="form-control" name='vinNumber' value={this.state.vinNumber} onChange={this.handleChange.bind(this)} />
                                    </div>
                                </div>
                            </div>
                            <div className='row p-3'>
                                <div className='col-2 '>
                                    Гос. номер
                                </div>
                                <div className='col-5 '>
                                    <div className="form-group">
                                        <input className="form-control" name='plateNumber' value={this.state.plateNumber} onChange={this.handleChange.bind(this)} />
                                    </div>
                                </div>
                            </div>
                            <div className='row p-3'>
                                <div className='col-2'>
                                    Марка
                                </div>
                                <div className='col-5'>
                                    <Form.Control as="select" onChange={this.onChangeBrand.bind(this)}>
                                        <option selected disabled value="default">Выберите марку</option>
                                        {brands.map(({ id, name }: IBrand) =>
                                                <option value={id}>{name}</option>
                                        )}
                                    </Form.Control>
                                </div>
                            </div>
                            {
                                this.state.showModel? <div className='row p-3'>
                                    <div className='col-2'>
                                        Модель
                                    </div>
                                    <div className='col-5'>
                                        <Form.Control as="select" onChange={this.onChangeModel.bind(this)} ref={(scope: any) => { this.dropDownListModels = scope; }}>
                                            <option disabled selected value='Выберите модель'>Выберите модель</option>
                                            {models.map(({ id, name }: IModel) =>
                                                <option value={name}>{name}</option>
                                            )}
                                        </Form.Control>
                                    </div>
                                </div> : <div></div>
                            }
                            {
                                this.state.showEngineType? <div className='row p-3'>
                                    <div className='col-2'>
                                        Тип двигателя
                                    </div>
                                    <div className='col-5'>
                                        <Form.Control as="select" onChange={this.onChangeEngineType.bind(this)} ref={(scope: any) => { this.dropDownListEngineType = scope; }}>
                                            <option selected disabled value='Выберите тип двигателя'>Выберите тип двигателя</option>
                                            {engineTypes.map(({ id, name }: IEngineType) =>
                                                <option value={id}>{name}</option>
                                            )}
                                        </Form.Control>
                                    </div>
                                </div> : <div></div>
                            }
                            {
                                this.state.showYearRelease?
                                    <div className='row p-3'>
                                        <div className='col-2'>
                                            Год выпуска
                                        </div>
                                        <div className='col-5'>
                                            <Form.Control as="select" onChange={this.onChangeYearRelease.bind(this)} ref={(scope: any) => { this.dropDownListYearRelease = scope; }}>
                                                <option selected disabled>Выберите год выпуска авто</option>
                                                {years.map(({ year_release }: IYearRelease) =>
                                                    <option value={year_release}>{year_release}</option>
                                                )}
                                            </Form.Control>
                                        </div>
                                    </div>: <div></div>
                            }
                            {
                                this.state.showModificataion?
                                    <div className='row p-3'>
                                        <div className='col-2'>
                                            Модификация
                                        </div>
                                        <div className='col'>
                                            <ButtonGroup onChange={this.onModificationChange.bind(this)}>
                                                    <ul>
                                                        {fullModels.map(({ id, engineCapacity, transmission , hp,bodyType,driveUnits, generation }: IModel) =>
                                                            <>
                                                                <li>
                                                                    <Button>
                                                                        <Form.Check
                                                                            custom
                                                                            label={`${generation.name}, ${engineCapacity}, ${hp} л.с, КПП ${transmission.type}, ${bodyType.name}, ${driveUnits.type} привод`}
                                                                            type={'radio'}
                                                                            id={`custom-inline-${id}`}
                                                                            name={'model'}
                                                                            value={`${id}`}
                                                                        />
                                                                    </Button>
                                                                </li>
                                                                <p></p>
                                                            </>
                                                        )}
                                                    </ul>
                                            </ButtonGroup>
                                        </div>
                                    </div>: <div></div>
                            }
                            <div className='row p-3'>
                                <div className='col-2'>
                                    Пробег
                                </div>
                                <div className='col-5'>
                                    <div className="form-group">
                                        <input className="form-control" name='mileage' value={this.state.mileage} onChange={this.handleChange.bind(this)} onBlur={() => this.state.validator.showMessageFor('mileage')} />
                                        {this.state.validator.message('mileage', this.state.mileage, 'required|min:20|max:120')}
                                    </div>
                                </div>
                            </div>
                            <div className='row p-3'>
                                <div className='col-2'>
                                    Цвет
                                </div>
                                <div className='col-5'>
                                    <CirclePicker colors={["#000000", "#979797", "#ffffff", "#0035ff", "#18f100","#ff0000"]} onChange={(color, event)=> {this.setState({currentColorHexCode:color.hex})} } />
                                </div>
                            </div>
                            <div className='row p-3'>
                                <div className='col-2'>
                                    Описание
                                </div>
                                <div className='col-5'>
                                    <textarea className="form-control" name='description' value={this.state.description} onChange={this.handleChange.bind(this)}></textarea>
                                </div>
                            </div>
                            <div className='row p-3'>
                                <div className='col-2'>
                                    Количество владельцев
                                </div>
                                <div className='col-5'>
                                    <input type={'number'} className="form-control" min={1} name='countOwners' value={this.state.countOwners} onChange={this.handleChange.bind(this)} />
                                </div>
                            </div>
                            {/*<div className='row p-3'>*/}
                            {/*    <div className='col-2'>*/}
                            {/*        Город продажи*/}
                            {/*    </div>*/}
                            {/*    <div className='col-5'>*/}
                            {/*        <Form.Control as="select" name='citySale' value={this.state.citySale} onChange={this.handleChange.bind(this)}>*/}
                            {/*            <option selected disabled>Выберите город</option>*/}
                            {/*            <option value='h'>Тюмень</option>*/}
                            {/*            /!*{years.map(({ yearRelease }: IModel) =>*!/*/}
                            {/*            /!*    <option value={yearRelease}>{yearRelease}</option>*!/*/}
                            {/*            /!*)}*!/*/}
                            {/*        </Form.Control>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className='row p-3'>
                                <div className='col-2'>
                                    Контактный телефон
                                </div>
                                <div className='col-5'>
                                    <input className="form-control" name='contactPhone' value={this.state.contactPhone} onChange={this.handleChange.bind(this)} />
                                </div>
                            </div>
                            <div className='row p-3'>
                                <div className='col-2'>
                                    Цена
                                </div>
                                <div className='col-5'>
                                    <div className="form-group">
                                        <input className="form-control" name='price' value={this.state.price} onChange={this.handleChange.bind(this)}  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p></p>
                    {/*<div className='row'>*/}
                    {/*    <div className='col-8 fon'>*/}
                    {/*        <h3>Добавьте фото</h3>*/}
                    {/*        /!*<ImageUploading*!/*/}
                    {/*        /!*    multiple*!/*/}
                    {/*        /!*    value={images}*!/*/}
                    {/*        /!*    onChange={this.onChange.bind(this)}*!/*/}
                    {/*        /!*    maxNumber={40}*!/*/}
                    {/*        /!*>*!/*/}
                    {/*        /!*    {({*!/*/}
                    {/*        /!*          imageList,*!/*/}
                    {/*        /!*          onImageUpload,*!/*/}
                    {/*        /!*          onImageRemoveAll,*!/*/}
                    {/*        /!*          onImageUpdate,*!/*/}
                    {/*        /!*          onImageRemove,*!/*/}
                    {/*        /!*          isDragging,*!/*/}
                    {/*        /!*          dragProps*!/*/}
                    {/*        /!*      }) => (*!/*/}
                    {/*        /!*        // write your building UI*!/*/}
                    {/*        /!*        <div className="upload__image-wrapper">*!/*/}
                    {/*        /!*            <button*!/*/}
                    {/*        /!*                style={isDragging ? { color: "red" } : undefined}*!/*/}
                    {/*        /!*                onClick={onImageUpload}*!/*/}
                    {/*        /!*                {...dragProps}*!/*/}
                    {/*        /!*            >*!/*/}
                    {/*        /!*                Click or Drop here*!/*/}
                    {/*        /!*            </button>*!/*/}
                    {/*        /!*            &nbsp;*!/*/}
                    {/*        /!*            <button onClick={onImageRemoveAll}>Remove all images</button>*!/*/}
                    {/*        /!*            {imageList.map((image, index) => (*!/*/}
                    {/*        /!*                <div key={index} className="image-item">*!/*/}
                    {/*        /!*                    <img src={image.dataURL} alt="" width="100" />*!/*/}
                    {/*        /!*                    <div className="image-item__btn-wrapper">*!/*/}
                    {/*        /!*                        <button onClick={() => onImageUpdate(index)}>Update</button>*!/*/}
                    {/*        /!*                        <button onClick={() => onImageRemove(index)}>Remove</button>*!/*/}
                    {/*        /!*                    </div>*!/*/}
                    {/*        /!*                </div>*!/*/}
                    {/*        /!*            ))}*!/*/}
                    {/*        /!*        </div>*!/*/}
                    {/*        /!*    )}*!/*/}
                    {/*        /!*</ImageUploading>*!/*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <p></p>
                    <div className='row'>
                        <div className='col-8'>
                            <Button variant="primary" type="submit">Подать объявление</Button>
                        </div>
                    </div>
                </div>
                </Form>
            </>
        );
    }
}

export default withRouter(AdsAppendPage);
export abstract class StandardSearchForm<T>{

  selectedRow : T;
  selectedCriteria: string;
  searchValue:any =''

  abstract findTitle:string
  abstract searchResult: T[]
  searchCriterias:string[] = [];
  abstract addSearchCriterias();
  abstract search();

  constructor(){
    this.searchCriterias.push('Please select')
    this.addSearchCriterias()
    this.selectedCriteria = this.searchCriterias[0]
  }

  onRowSelected(t:T){
    this.selectedRow = t;
  }

}

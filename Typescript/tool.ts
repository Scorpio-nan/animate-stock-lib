class Tool{
	public constructor(){};
	//时间格式化		
	/*
	* getRangeDate( -6 );			// 结果：2017-02-09
	* getRangeDate( -6, 'one' );	// 结果：2017-02-09
	* getRangeDate( -6, 'more' ); 	// 结果：["2017-02-09", "2017-02-10", "2017-02-11", "2017-02-12", "2017-02-13", "2017-02-14", "2017-02-15"]
	**/
	public getRangeDate( range: number, type?: string ):string {
        const formatDate = ( time: any ) => {
            // 格式化日期，获取今天的日期
            const Dates = new Date( time );
            const year: number = Dates.getFullYear();
            const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
            const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
            return year + '-' + month + '-' + day;
        };

        const now = formatDate( new Date().getTime() ); // 当前时间
        if(range == 0) return now;
        const resultArr: Array<any> = [];
        let changeDate: string;
        if ( range ) {
            if ( type ) {
                if ( type === 'one' ) {
                    changeDate = formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * range ) );
                }
                if ( type === 'more' ) {
                    if ( range < 0 ) {
                        for ( let i = Math.abs( range ); i >= 0; i-- ) {
                            resultArr.push( formatDate( new Date().getTime() + ( -1000 * 3600 * 24 * i ) ) );
                        }
                    } else {
                        for ( let i = 1; i <= range; i++ ) {
                            resultArr.push( formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * i ) ) );
                        }
                    }
                }
            } else {
                changeDate = formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * range ) );
            }
        }
        return changeDate;
    }
	
}
class GraphController < ApplicationController
  def index
  end

  def data

    #id = params[:id]
    id = "1"
    start_time = (Date.parse(Time.now.to_s) - 8).strftime("%Y-%m-%d")
    end_time = Time.now.strftime("%Y-%m-%d")

    request =
        '{ "cube": "supply_stats", '        + 
        '  "fields": ['                     + 
        '      { "field": "Day" },'         +
        '      { "field": "Impressions" },' +
        '      { "field": "Clicks" },'      +
        '      { "field": "Conversions" },' +
        '      { "field": "Revenue USD" }'  +
        '  ],'                              +
        '  "filters": ['                    +
        '      { "field": "Publisher ID", "operator": "=", "value": ' + id + ' },'                                +
        '      { "field": "Day", "operator": "between", "from": "' + start_time + '", "to": "' + end_time + '" }' +
        '  ]' +
        '}'

    Rails.logger.info "Request string is: " + request

    # Replace this with json request
    @data = getData(request)

    respond_to do |format|
      format.json {
        render :json => @data
      }
    end
  end 

  private
    def getData(request)
    
      @data = '[' +
          '{"date":"2015-02-01", "impressions":1234, "clicks":12, "conversions":1, "revenue":24.34}' +
         ',{"date":"2015-02-02", "impressions":1534, "clicks":16, "conversions":2, "revenue":54.34}' +
         ',{"date":"2015-02-03", "impressions":134, "clicks":36, "conversions":0, "revenue":14.34}' +
         ',{"date":"2015-02-04", "impressions":1304, "clicks":36, "conversions":0, "revenue":74.34}' +
         ',{"date":"2015-02-05", "impressions":1349, "clicks":32, "conversions":1, "revenue":76.34}' +
         ',{"date":"2015-02-06", "impressions":1300, "clicks":33, "conversions":1, "revenue":70.34}' +
         ']'
      #@data = [1,2,3,4,5]

      return @data
    end
  
end

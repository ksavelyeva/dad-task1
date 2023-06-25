openapi: 3.1.0
info:
  title: LIS-MIA
  description: |-
    Interface between economic and logistic system.

    Prerequisites for correct functioning:
      - organization unit converter (SESU)
      - scope converter
      - NRN is unique identifier
      - currency (price) only UAH
  version: 1.0.0
servers:
  - url: none
tags:
  - name: invertoryAsset
    description: Everything about invertory asset
  - name: nonInvertoryAsset
    description: Everything about non-invertory asset
paths:
  /auth/v1:
    post:
      tags:
        - auth
      summary: auth and get session token
      security:
        - bearerAuth: [] # acsess token
      responses:
        '200':
          description: successful
          content: 
            text/plain:
              schema:
                type: string
                example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJURVNUUkVTVEFQSSIsImp0aSI6ImF3ZHJneWppbHAiLCJpYXQiOjE2NjI5MTQyNjN9.oL3wIs0SU4dD2LBs8bzwRaCGfQJDoIqSDcT279voITpKhw073m02YQKF-GMm2AHDsCQpCoFO0B7r7nJcyoKCEw
  /call/v1/invertoryAsset:
    post:
      tags:
        - invertoryAsset
      summary: find invertory asset by parameters
      security:
        - bearerAuth: [] # session token
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/InvertoryAsset'
      responses:
        '200':
          description: successful
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/InvertoryItem'
        '400':
          description: Invalid value
  /call/v1/nonInvertoryAsset:
    post:
      tags:
        - nonInvertoryAsset
      summary: find non-invertory asset by parameters
      security:
        - bearerAuth: []
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/InvertoryAsset'
      responses:
        '200':
          description: successful
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/NonInvertoryItem'
        '400':
          description: Invalid value
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    InvertoryAsset:
      type: object
      required: 
        - orgUnit
        - decisiveDate
      properties:
        orgUnit:
          type: string
          description: identifier organization unit.          
        decisiveDate:
          description: number of assets on a specific date
          type: string
          format: date
        scope:
          description: scope invertory item
          type: string
          enum:
            - ENGINEERING
            - RADIATION_CHEMICAL_BACTERIOLOGICAL_PROTECTION
            - DIVING
            - AVIATION
            - ECOLOGY
            - METROLOGY
            - FIREFIGHTING_AND_TECHNICAL_ORIENTATION
            - AUTOMOBILES
            - FUEL_AND_LUBRICANTS
            - MATERIEL
            - FOODSTUFFS
            - COMMUNAL_AND_HOUSING_PROVIDING
            - CONSTRUCTIONS_AND_REPAIRS
            - COMMUNICATIONS_AND_TELECOMMUNICATIONS
            - MEDICINE
            - CYNOLOGY
    InvertoryItem:
      type: object
      properties:
        identifier:
          type: string
          example: 2651037263
          description: NRN | NRN в інвентарній картотеці | NRN v inventární kartotéce
        orgUnitCode:
          type: string
          example: "17_00_38610079_85186"
          description: SJUR_PERS | Код структурного підрозділу | Kód organizačního prvku
        responsiblePerson:
          type: string
          example: Кошельник Віктор Іванович
          description: SEXEC_NAME | Матеріально-відповідальна особа | Hmotně zodpovědná osoba
        invertoryNumber:
          type: string
          example: 10146-0214
          description: SINV_GROUP | Інвентарний номер | Inventární číslo
        catalogueNumber:
          type: string
          example: 10140200712792
          description: SNOM | Код номера в каталозі матеріалів | Kód čísla v katalogu materiálů
        catalogueName:
          type: string
          example: Генератор Kohler/SDMO XPJ165, 120 кВт
          description: SNOM_NAME | Найменування в каталозі матеріалів | Původní název
        measureUnit:
          type: string
          example: шт
          description: SMEAS_MAIN | Найменування одиниці виміру | Název měrné jednotky
        scope:
          type: string
          example: "ENGINEERING"
          description?: ???? | Напрям | Směr
        price:
          type: number
          example: 21239
          description: NA_B_COST | Сума | Cena
        methodOfAcquisition:
          type: string
          example: 31
          description: SANALYTIC1 | Джерело надходження | Způsob nabytí
        decisiveDate:
          type: date
          format: date
          example: 2023-01-03
          description: DINCOME_DATE | Дата отримання | Datum obdržení
        serialNumber:
          type: string
          example: A306801A1120100
          description?: ???? | Заводський номер | Výrobní číslo (tovární číslo)
        technicalLicenseNumber:
          type: string
          example: 1A23456
          description?: ???? | Паспортний номер | Číslo technického průkazu
        properties:
          type: string
          example:
            - property1
            - property2
          description?: ???? | Характеристики | Vlastnosti
        model:
          type: string
          example: Kohler
          description?: ???? | Модель, марка | Model, značka
        donor:
          type: string
          example: організації
          description: ???? | Донор | Dárce
    NonInvertoryItem:
      type: object
      properties:
        identifier:
          type: number
          example: 2651037263
          description: NRN | NRN в інвентарній картотеці | NRN v inventární kartotéce
        orgUnitCode:
          type: string
          example: "17_00_38610079_85186"
          description: SJUR_PERS | Код структурного підрозділу | Kód organizačního prvku
        decisiveDate:
          type: string
          format: date
          example: 2023-01-03
          description: DREMN_DATE | Дата залишку | Datum zbytku
        methodOfAcquisition:
          type: string
          example: 31
          description: SANALYTIC1 | Джерело надходження | Způsob nabytí
        responsiblePerson:
          type: string
          example: Кошельник Віктор Іванович
          description: SAGENT | Матеріально-відповідальна особа | Hmotně zodpovědná osoba
        catalogueNumber:
          type: string
          example: "10140200712792"
          description: SNOMEN | Код номера в каталозі матеріалів | Kód čísla v katalogu materiálů
        catalogueName:
          type: string
          example: Генератор Kohler/SDMO XPJ165, 120 кВт
          description: SNOMEN_NAME | Найменування в каталозі матеріалів | Původní název
        measureUnit:
          type: string
          example: шт
          description: SMEAS_MAIN | Найменування одиниці виміру | Název měrné jednotky
        scope:
          type: string
          example: "ENGINEERING"
          description?: ???? | Напрям | Směr
        quantity:
          type: number
          example: 25
          description: NACNT_REMN_QUANT | Кількість | Množství položky
        price:
          type: number
          example: 21239
          description: NACNT_REMN_SUM | Сума | Cena
        donor:
          type: string
          example: організації
          escription?: ???? | Донор | Dárce
          
import { emptyProperty, PropertyModel } from '../model/property.model';
import * as propertyService from './property.service';

test('Get display name of property', () => {
    // Arrange
    const property: PropertyModel = {
        ...emptyProperty,
        name: 'MyHouse',
        egid: '432434',
    };
    const expectedDisplayName = 'MyHouse (432434)';

    // Act
    const displayName = propertyService.getDisplayNameOfProperty(property);

    // Assert
    expect(displayName).toEqual(expectedDisplayName);
});

test('Sort collection of properties correctly', () => {
    // Arrange
    const list: PropertyModel[] = [
        { ...emptyProperty, name: 'MFH in Rüschlikon' },
        { ...emptyProperty, name: 'MFH am Bellevue' },
    ];

    // Act
    propertyService.sortPropertiesByNameAsc(list);

    // Assert
    expect(list[0].name).toEqual('MFH am Bellevue');
});

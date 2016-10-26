require 'test_helper'

class GearCategoriesControllerTest < ActionController::TestCase
  setup do
    @gear_category = gear_categories(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:gear_categories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create gear_category" do
    assert_difference('GearCategory.count') do
      post :create, gear_category: { description: @gear_category.description, gear_page_id: @gear_category.gear_page_id, name: @gear_category.name }
    end

    assert_redirected_to gear_category_path(assigns(:gear_category))
  end

  test "should show gear_category" do
    get :show, id: @gear_category
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @gear_category
    assert_response :success
  end

  test "should update gear_category" do
    patch :update, id: @gear_category, gear_category: { description: @gear_category.description, gear_page_id: @gear_category.gear_page_id, name: @gear_category.name }
    assert_redirected_to gear_category_path(assigns(:gear_category))
  end

  test "should destroy gear_category" do
    assert_difference('GearCategory.count', -1) do
      delete :destroy, id: @gear_category
    end

    assert_redirected_to gear_categories_path
  end
end

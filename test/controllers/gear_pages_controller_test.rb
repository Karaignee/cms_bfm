require 'test_helper'

class GearPagesControllerTest < ActionController::TestCase
  setup do
    @gear_page = gear_pages(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:gear_pages)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create gear_page" do
    assert_difference('GearPage.count') do
      post :create, gear_page: { ancestry: @gear_page.ancestry, artist_id: @gear_page.artist_id, brand_id: @gear_page.brand_id, description: @gear_page.description, genre_id: @gear_page.genre_id, name: @gear_page.name }
    end

    assert_redirected_to gear_page_path(assigns(:gear_page))
  end

  test "should show gear_page" do
    get :show, id: @gear_page
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @gear_page
    assert_response :success
  end

  test "should update gear_page" do
    patch :update, id: @gear_page, gear_page: { ancestry: @gear_page.ancestry, artist_id: @gear_page.artist_id, brand_id: @gear_page.brand_id, description: @gear_page.description, genre_id: @gear_page.genre_id, name: @gear_page.name }
    assert_redirected_to gear_page_path(assigns(:gear_page))
  end

  test "should destroy gear_page" do
    assert_difference('GearPage.count', -1) do
      delete :destroy, id: @gear_page
    end

    assert_redirected_to gear_pages_path
  end
end
